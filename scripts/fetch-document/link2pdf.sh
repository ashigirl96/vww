#!/bin/bash

# 標準入力からリンクを受け取り、wkhtmltopdfでPDFに変換
index=1
while read -r link; do
  output_file=$(printf "%02d_output.pdf" $index)
  wkhtmltopdf "$link" "$output_file"
  ((index++))
done < /dev/stdin

echo "PDF変換完了"
