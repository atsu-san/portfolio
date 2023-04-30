import sys
import csv

def batch_text_replace(term_list_file, target_file):
    '''
    Performs batch text replace operation based on tab-separated term list file.
    '''
    with open(target_file, encoding='utf8') as f:
        lines = f.read()

    with open(term_list_file, newline='', encoding='utf8') as f:
        texts = csv.reader(f, delimiter='\t')
        for i, text in enumerate(texts, 1):
            if (len(text) != 2):
                print('Invalid entry. Skipped line ' + str(i) + ' in ' +
                      term_list_file + ': [' + ', '.join(text) + ']')
                continue
            lines = lines.replace(text[0], text[1])

    with open(target_file, mode='w', encoding='utf8') as f:
        f.write(lines)

    print('Done!')

print(batch_text_replace.__doc__)

batch_text_replace(sys.argv[1], sys.argv[2])

quit()
