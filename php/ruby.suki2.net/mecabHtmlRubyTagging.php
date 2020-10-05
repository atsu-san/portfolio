<?php
function mecabHtmlRubyTagging($input, $mecab_path, $yomi_type = "hiragana", $max_text_length = 1000)
{

    if (empty($input)) {
        $input = "これはサンプル文字列です。トップページで任意の文字列を入力して「ルビを生成する」ボタンを押すと、このように振り仮名が生成されます。\r\n上の「クリップボードにコピーする」ボタンを押すと、＜ruby＞タグ付きの文字列をクリップボードにコピーすることができます。\r\nあなたのWebサイトに貼り付けてみてください！";
    }

    if (mb_strlen($input) > ($max_text_length * 1.2)) {
        return "エラー：最大文字数を超えています。";
    }

    setlocale(LC_CTYPE, 'ja_JP.UTF-8');

    exec('echo ' . escapeshellarg($input) . ' | ' . $mecab_path . ' -Ochasen2', $morpheme, $result); //「-Ochasen2」では半角スペースが無視されない
    //array_pop($morpheme); //末尾の要素"EOS"を削除
    //var_dump($morpheme);
    if ($result != 0) {
        return "問題が発生しました。";
        //echo("問題発生 - コード：".$result."<br>");
    }

    function splitAtPosition($str, $position)
    {
        //$positionがプラスの整数の場合は先頭からカウント
        //$positionがマイナスの整数の場合は末尾からカウント
        $num = mb_strlen($str);
        if ($num <= $position) {
            return false;
        }

        if ($position >= 0) {
            $half1 = mb_substr($str, 0, $position);
            $half2 = mb_substr($str, $position);
        } else {
            $half1 = mb_substr($str, 0, $num + $position);
            $half2 = mb_substr($str, $num + $position);
        }
        return array($half1, $half2);
    }

    $num_of_morpheme = count($morpheme); //形態素の数

    for ($i = 0; $i < $num_of_morpheme; $i++) {
        if (preg_match('/^EOS$/', $morpheme[$i])) {
            array_splice($morpheme, $i, 1);
            $i--;
            $num_of_morpheme--;
        }

        $raw = explode("\t", $morpheme[$i], 3); //入力文字列、ヨミ、それ以降の文字列からなる3要素の配列に変換
        $yomi[0] = mb_convert_kana($raw[0], "Hca"); //全角半角カタカナを全角ひらがなに、全角英数字を半角英数字に変換
        $yomi[1] = mb_convert_kana($raw[1], "Hca"); //全角半角カタカナを全角ひらがなに、全角英数字を半角英数字に変換

        $num = mb_strlen($raw[0]);

        //入力文字列とヨミが同じ場合
        if (strcmp($raw[0], $yomi[1]) === 0) {
            continue;
        }

        //先頭が1文字以上一致している場合、一致部分を分割
        for ($n = 1, $count = 0; $n < $num; $n++) {
            //末尾の一致文字数をカウント
            if (mb_substr($yomi[0], 0, $n) === mb_substr($yomi[1], 0, $n)) {
                $count++;
            } else {
                break;
            }
        }
        if ($count > 0) {
            $column1 = splitAtPosition($raw[0], $count);
            $column2 = splitAtPosition($raw[1], $count);
            if (!$column1 || !$column2) continue;
            $pre = $column1[0] . "\t" . $column2[0] . "\t";
            $post = $column1[1] . "\t" . $column2[1] . "\t";
            array_splice($morpheme, $i, 1, array($pre, $post));
            $num_of_morpheme++;
            continue;
        }

        //末尾が1文字以上一致している場合、一致部分を分割
        for ($n = -1, $count = 0; $n > -$num; $n--) {
            //末尾の一致文字数をカウント
            if (mb_substr($yomi[0], $n) === mb_substr($yomi[1], $n)) {
                $count++;
            } else {
                break;
            }
        }
        if ($count > 0) {
            $column1 = splitAtPosition($raw[0], -$count);
            $column2 = splitAtPosition($raw[1], -$count);
            $pre = $column1[0] . "\t" . $column2[0] . "\t";
            $post = $column1[1] . "\t" . $column2[1] . "\t";
            array_splice($morpheme, $i, 1, array($pre, $post));
            $i--;
            $num_of_morpheme++;
            continue;
        }

        //入力文字列に1字以上のひらがなの塊(塊が2つ以上でも可)が含まれており、かつ、そのひらがなの塊が文中にある場合
        //最初のひらがなの前の字までと最初のひらがな以降の文字列を分割
        mb_ereg_search_init($raw[0]);
        if (mb_ereg_search("^([^ぁ-ゞー]+)([ぁ-ゞー]+)([^ぁ-ゞー].*)$")) {
            $match = mb_ereg_search_getregs();
            //$match[0]＝一致した部分文字列全体、$match[1]＝最初の括弧でグループ化された部分、$match[2]＝2番目の括弧でグループ化された部分、$match[3]＝3番目の括弧でグループ化された部分
            //echo "一致：「".$match[1]."→".$match[2]."→".$match[3]."」";
            if (substr_count($yomi[1], $match[2]) === 1) {
                //読み全体の中にひらがなの塊が1回だけ含まれている場合
                $raw0_split_pos = mb_strlen($match[1]);

                mb_ereg_search_init($yomi[1]);
                mb_ereg_search("^(.+)(" . $match[2] . ")(.+)$");
                $match = mb_ereg_search_getregs();
                //echo "一致：「".$match[1]."→".$match[2]."→".$match[3]."」";
                $raw1_split_pos = mb_strlen($match[1]);

                $column1 = splitAtPosition($raw[0], $raw0_split_pos);
                $column2 = splitAtPosition($raw[1], $raw1_split_pos);
                $pre = $column1[0] . "\t" . $column2[0] . "\t";
                $post = $column1[1] . "\t" . $column2[1] . "\t";
                array_splice($morpheme, $i, 1, array($pre, $post));
                $num_of_morpheme++;
                continue;
            }
        }

        //入力文字列の文字数とヨミの文字数が同じ場合、1文字ずつ分割
        if ($num === mb_strlen($yomi[1])) {
            if (!preg_match("/[ぁ-ゞー]/u", $yomi[0])) {
                //ひらがな、カタカナが含まれていない場合は分割しない
                continue;
            }
            $split_elem = array();
            $column1 = preg_split('//u', $raw[0], null, PREG_SPLIT_NO_EMPTY);
            $column2 = preg_split('//u', $raw[1], null, PREG_SPLIT_NO_EMPTY);
            for ($c = 0; $c < $num; $c++) {
                array_push($split_elem, $column1[$c] . "\t" . $column2[$c] . "\t");
            }
            array_splice($morpheme, $i, 1, $split_elem);
            $i += $num - 1;
            $num_of_morpheme += $num - 1;
            continue;
        }
    }

    $result = "";
    $num_of_morpheme = count($morpheme); //形態素の数

    //var_dump($morpheme);

    for ($i = 0; $i < $num_of_morpheme; $i++) {
        $raw = explode("\t", $morpheme[$i], 3); //入力文字列、ヨミ、それ以降の文字列からなる3要素の配列に変換

        $yomi[0] = mb_convert_kana($raw[0], "Hca"); //全角半角カタカナを全角ひらがなに、全角英数字を半角英数字に変換
        $yomi[1] = mb_convert_kana($raw[1], "Hca"); //全角半角カタカナを全角ひらがなに、全角英数字を半角英数字に変換
        //echo $raw[0]."→".$raw[1]."→".$yomi[0]."→".$yomi[1]."<br>";
        if (preg_match("/^[0-9a-zA-Z ]+$/", $yomi[0])) {
            //入力文字列が英数字スペースの場合
            $result .= $raw[0];
        } elseif (strcmp($yomi[0], $yomi[1]) !== 0) {
            //入力文字列(ひらがな変換後)とヨミ(ひらがな変換後)が一致しない場合
            if ($yomi_type === "katakana") {
                $yomi[1] = mb_convert_kana($yomi[1], "h"); //全角ひらがなを全角カタカナに変換
            }
            $result .= "<ruby>" . $raw[0] . "<rp>(</rp><rt>" . $yomi[1] . "</rt><rp>)</rp></ruby>";
        } else {
            //入力文字列(ひらがな変換後)とヨミ(ひらがな変換後)が一致する場合
            //ヨミのない漢字の処理をここに実装
            $result .= $raw[0];
        }
    }
    $result = preg_replace('/(<ruby>)([ ]+)/', '\2\1', $result); //<ruby>タグの後のスペースをタグの前へ移動
    $result = htmlspecialchars($result);
    $result = str_replace(array("&lt;ruby&gt;", "&lt;rp&gt;", "&lt;/rp&gt;", "&lt;rt&gt;", "&lt;/rt&gt;", "&lt;/ruby&gt;"), array("<ruby>", "<rp>", "</rp>", "<rt>", "</rt>", "</ruby>"), $result);

    return $result;
}
