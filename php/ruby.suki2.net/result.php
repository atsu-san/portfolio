<?php
require_once('initial_settings.php');

$result_for_copy = "";
$result_with_br_tag = "";

if (isset($_POST['user_input'])) {
    $result = mecabHtmlRubyTagging($_POST['user_input'], $mecab_path, $_POST['yomi_type'], $max_input_length);
    $result_with_br_tag = nl2br($result);
    $result_for_copy = isset($_POST['br_tag_flag']) ? $result_with_br_tag : $result;
}
?>
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="robots" content="index,follow">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/ruby_main.css" type="text/css" media="all" />
    <title>ルビ(＜ruby＞)タグ生成結果</title>
</head>

<body>
    <?php
    include('header.php');
    ?>

    <h1>ルビ(&lt;ruby&gt;)タグ生成結果</h1>
    <div class="parent">
        <div class="child">
            <div id="output_copy">
                <h2>ルビ付きHTML文字列<span class="nowrap">(コピー用)：</span></h2>
                <p class="center"><button id="copy_btn">クリップボードにコピーする</button><br>
                    <textarea id="tagged_output" readonly><?= $result_for_copy ?></textarea></p>
            </div>
        </div>
        <div class="child">
            <div id="output_preview">
                <h2>ルビ付きHTML文字列<span class="nowrap">(プレビュー)：</span></h2>
                <p><?= $result_with_br_tag ?></p>
            </div>
        </div>
    </div>

    <p class="caution_ruby_error">ご注意：<br>上記の振り仮名はプログラムにより自動生成されているため、<u>誤りが含まれている可能性があります。</u><br>ご自身のWebサイトでお使いになる前に、振り仮名の内容に誤りがないか確認し、誤りがあった場合は手動で修正していただきますようお願い申し上げます。<br>本サイトでは変換精度向上のため、プログラムを順次修正しております。</p>
    <p class="center"><a href="./">トップページに戻る</a></p>

    <?php
    include('footer.php');
    ?>

    <script>
        function copyToClipboard() {
            var copyText = document.querySelector("#tagged_output");
            copyText.select();
            document.execCommand("copy");
        }
        document.querySelector("#copy_btn").addEventListener("click", copyToClipboard);
    </script>

    <script>
        window.addEventListener("load", function() {
            var e = document.querySelector("#tagged_output");
            e.offsetHeight < e.scrollHeight ? e.style.height = e.scrollHeight + 'px' : nil;
        });
    </script>

</body>

</html>