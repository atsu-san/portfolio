<?php
require_once('initial_settings.php');
?>
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="robots" content="index,follow">
    <meta name="description" content="漢字に振り仮名(ルビ)を振ろう！ - HTML＜ruby＞タグ自動生成サイト">
    <meta name="keywords" content="振り仮名,読み仮名,ルビ,rubyタグ,rpタグ,rtタグ,HTML,漢字,Webサイト,振り仮名を振る,読み仮名を振る,ルビを振る">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/ruby_main.css" type="text/css" media="all" />
    <title>漢字に振り仮名(ルビ)を振ろう！ - HTML＜ruby＞タグ自動生成サイト</title>
</head>

<body>
    <?php
    include('header.php');
    ?>
    <div id="demo">
        <span id="demo1">和布蕪と秋刀魚が食べたいなぁ</span>
        <span id="demo2">　⇒　</span>
        <span id="demo3"><ruby>和布蕪<rp>(</rp>
                <rt>めかぶ</rt>
                <rp>)</rp>
            </ruby>と<ruby>秋刀魚<rp>(</rp>
                <rt>さんま</rt>
                <rp>)</rp>
            </ruby>が<ruby>食<rp>(</rp>
                <rt>た</rt>
                <rp>)</rp>
            </ruby>べたいなぁ</span>
    </div>
    <div id="main">
        <h4><ruby>振<rp>(</rp>
                <rt>ふ</rt>
                <rp>)</rp>
            </ruby>り<ruby>仮名<rp>(</rp>
                <rt>がな</rt>
                <rp>)</rp>
            </ruby>(ルビ)を<ruby>振<rp>(</rp>
                <rt>ふ</rt>
                <rp>)</rp>
            </ruby>るテキストを<ruby>以下<rp>(</rp>
                <rt>いか</rt>
                <rp>)</rp>
            </ruby>に<ruby>入力<rp>(</rp>
                <rt>にゅうりょく</rt>
                <rp>)</rp>
            </ruby>します(<ruby>最大<rp>(</rp>
                <rt>さいだい</rt>
                <rp>)</rp>
            </ruby><?= $max_input_length ?><ruby>字<rp>(</rp>
                <rt>じ</rt>
                <rp>)</rp>
            </ruby>)。</h4>
        <form action="result.php" method="post">
            <textarea id="user_input_textarea" name="user_input" maxlength="<?= $max_input_length ?>"></textarea>
            <p><ruby>入力<rp>(</rp>
                    <rt>にゅうりょく</rt>
                    <rp>)</rp>
                </ruby><ruby>可能<rp>(</rp>
                    <rt>かのう</rt>
                    <rp>)</rp>
                </ruby>な<ruby>文字<rp>(</rp>
                    <rt>もじ</rt>
                    <rp>)</rp>
                </ruby>：<ruby>残<rp>(</rp>
                    <rt>のこ</rt>
                    <rp>)</rp>
                </ruby>り<span id="input_counter"><?= $max_input_length ?></span><ruby>字<rp>(</rp>
                    <rt>じ</rt>
                    <rp>)</rp>
                </ruby></p>
            <h4><ruby>変換<rp>(</rp>
                    <rt>へんかん</rt>
                    <rp>)</rp>
                </ruby>オプションを<ruby>選択<rp>(</rp>
                    <rt>せんたく</rt>
                    <rp>)</rp>
                </ruby>します。</h4>
            <table>
                <tr>
                    <td><u>ルビに<ruby>使用<rp>(</rp>
                                <rt>しよう</rt>
                                <rp>)</rp>
                            </ruby>する<ruby>文字<rp>(</rp>
                                <rt>もじ</rt>
                                <rp>)</rp>
                            </ruby>：</u>
                    </td>
                    <td>
                        <input type="radio" id="hiragana_chk" name="yomi_type" value="hiragana" checked>
                        <label for="hiragana_chk">ひらがな</label>
                        <input type="radio" id="katakana_chk" name="yomi_type" value="katakana">
                        <label for="katakana_chk">カタカナ</label>
                    </td>
                </tr>
                </td>
                <td><u><ruby>改行<rp>(</rp>
                            <rt>かいぎょう</rt>
                            <rp>)</rp>
                        </ruby>の<ruby>処理<rp>(</rp>
                            <rt>しょり</rt>
                            <rp>)</rp>
                        </ruby><ruby>方法<rp>(</rp>
                            <rt>ほうほう</rt>
                            <rp>)</rp>
                        </ruby>：</u>
                </td>
                <td>
                    <input type="checkbox" id="br_chk" name="br_tag_flag" value="on" checked>
                    <label for="br_chk"> <ruby>改行<rp>(</rp>
                            <rt>かいぎょう</rt>
                            <rp>)</rp>
                        </ruby><ruby>文字<rp>(</rp>
                            <rt>もじ</rt>
                            <rp>)</rp>
                        </ruby>の<ruby>前<rp>(</rp>
                            <rt>まえ</rt>
                            <rp>)</rp>
                        </ruby>にHTMLの<ruby>改行<rp>(</rp>
                            <rt>かいぎょう</rt>
                            <rp>)</rp>
                        </ruby>タグ&lt;br /&gt;を<ruby>挿入<rp>(</rp>
                            <rt>そうにゅう</rt>
                            <rp>)</rp>
                        </ruby>する</label>
                    <br>
                </td>
                </tr>
            </table>
            <h4>ルビ<ruby>生成<rp>(</rp>
                    <rt>せいせい</rt>
                    <rp>)</rp>
                </ruby>ボタンを<ruby>押<rp>(</rp>
                    <rt>お</rt>
                    <rp>)</rp>
                </ruby>します。</h4>
            <p class="center">
                <input type="submit" value="ルビを生成する" id="ruby_btn">
            </p>
        </form>
    </div>
    <?php
    include('footer.php');
    ?>
    <script>
        var input_text = document.querySelector("#user_input_textarea");
        var counter = document.querySelector("#input_counter");
        input_text.addEventListener("keyup", function() {
            counter.textContent = <?= $max_input_length ?> - input_text.value.length;
            if (<?= $max_input_length ?> <= input_text.value.length) alert("最大文字数に達しました。");
        });
    </script>
</body>

</html>