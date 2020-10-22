<?php
//同一文に対して訳し分けが必要な場合はgettextの代わりにユーザー定義関数pgettextを使用
if (!function_exists('pgettext')) {
  function pgettext($context, $msgid)
  {
    $contextString = "{$context}\004{$msgid}";
    $translation = gettext($contextString);
    return ($translation === $contextString) ? $msgid : $translation;
  }
}

// 事前にサーバーOSに完全一致のロケール名が存在することを確認する必要あり
// Linuxの場合「locale -a」で確認

// $locale = 'ja_JP.utf8';
// $mo_filename = 'ja_JP';

// $locale = 'en_US.utf8';
// $mo_filename = 'en_US';

// $locale = 'de_DE.utf8';
// $mo_filename = 'de_DE';

$locale = $_POST['locale'];
$mo_filename = $_POST['mo_filename'];

putenv('LC_ALL=' . $locale);
setlocale(LC_ALL, $locale);

bind_textdomain_codeset($mo_filename, 'UTF-8');

// 変換テーブルの場所を指定
// 翻訳は「./locale/ja_JP/LC_MESSAGES/ja_JP.mo」等から取得
bindtextdomain($mo_filename, './locale');

// ドメインを選択
textdomain($mo_filename);

$num_singular = 1;
$num_plural = 5;

echo '<div id="output">';
echo '<span style="display:inline-block; width:100px;">Singular:</span>';

// ngettextはgettextの複数形版
printf(ngettext("%d user likes this. ", "%d users like this. ", $num_singular), $num_singular);

echo '<br>';
echo '<span style="display:inline-block; width:100px;">Plural:</span>';

printf(ngettext("%d user likes this. ", "%d users like this. ", $num_plural), $num_plural);

echo '</div>';
