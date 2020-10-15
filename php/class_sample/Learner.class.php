<?php
class Learner extends Participant
{
    protected const USER_TYPE = '学習者';

    public function getLessonReports(string $from_date = parent::DEFAULT_FROM_DATE, string $to_date = parent::DEFAULT_TO_DATE, int $count = 0): ?array
    {
        require_once('func_check_dates.php');
        check_dates($from_date, $to_date);

        $this->from_date = $from_date;
        $this->to_date = $to_date;
        $this->count = $count;

        $limit = ($this->count > 0) ? " LIMIT :count" : "";

        $stmt = $this->pdo->prepare("SELECT lesson_date, name, email, lesson_report FROM lesson_registration WHERE user_type=:user_type AND email=:email AND lesson_date>=:from_date AND lesson_date<=:to_date AND cancel_flag = 0 AND lesson_report IS NOT NULL ORDER BY lesson_date DESC" . $limit);
        $stmt->bindValue(':user_type', self::USER_TYPE, PDO::PARAM_STR);
        $stmt->bindValue(':email', $this->email, PDO::PARAM_STR);
        $stmt->bindValue(':from_date', $this->from_date, PDO::PARAM_STR);
        $stmt->bindValue(':to_date', $this->to_date, PDO::PARAM_STR);
        if ($this->count > 0) $stmt->bindValue(':count', $this->count, PDO::PARAM_INT);
        $stmt->execute();
        $row_count = $stmt->rowCount();
        if ($row_count > 0) {
            $db_output = $stmt->fetchAll();
            $db_output = array_reverse($db_output);
            foreach ($db_output as $key => $value) {
                $lesson_report = json_decode($value[3], true);

                if (!$lesson_report['lesson_content']) {
                    // レポートが空の場合は削除
                    unset($db_output[$key]);
                    continue;
                }

                $result[$key] = array_merge(array('lesson_date' => $value[0], 'name' => $value[1], 'email' => $value[2]), $lesson_report);
                // echo $result[0]['lesson_date'];
                // echo $result[0]['name'];
                // echo $result[0]['email'];
                // echo $result[0]['teacher'];
                // echo $result[0]['lesson_content'];
            }
            $result = array_values($result); // unsetで要素を削除したので添え字を振り直す
            return $result;
        } else {
            return null;
        }
    }
}
