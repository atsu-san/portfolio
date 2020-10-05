<?php
$this_year = date("Y");
?>
<hr>
<div id="footer">
    <div id="copyright">
        <p>&copy; <?= $this_year ?> <a href="<?= $url_prefix . $site_addr ?>"><?= $site_name . " (" . $site_addr . ")" ?></a></p>
        <p>謝辞：本サイトは形態素解析に以下のツールを利用しています。 <br>
            <a href="https://taku910.github.io/mecab/" target="_blank" rel="noopener noreferrer" tabindex="-1">MeCab: Yet Another Part-of-Speech and Morphological Analyzer</a><br>
            <a href="https://github.com/neologd/mecab-ipadic-neologd" target="_blank" rel="noopener noreferrer" tabindex="-1">mecab-ipadic-NEologd : Neologism dictionary for MeCab</a></p>
    </div>
</div>