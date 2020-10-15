<?php
class Participant
{
    protected $pdo;
    protected const USER_TYPE = null;
    protected const DEFAULT_FROM_DATE = '0000-01-01';
    protected const DEFAULT_TO_DATE = '9999-12-31';

    public $from_date;
    public $to_date;

    // public $lesson_date;
    // public $user_type;
    // public $name;
    // public $email;
    // public $tel;
    // public $country;
    // public $japanese_level;
    // public $preferred_teaching_language;
    // public $preferred_lesson_style;
    // public $comment;
    // public $online_lesson_flag;
    // public $cancel_flag;
    // public $created;
    // public $lesson_report;
    // public $admin_note;

    public function __construct(PDO $pdo, $email)
    {
        $this->pdo = $pdo;
        $this->email = $email;
    }

    public function getAll(string $from_date = self::DEFAULT_FROM_DATE, string $to_date = self::DEFAULT_TO_DATE): ?array
    {
        require_once('func_check_dates.php');
        check_dates($from_date, $to_date);

        $this->from_date = $from_date;
        $this->to_date = $to_date;

        $where_user_type = (is_null(static::USER_TYPE)) ? "" : "user_type=:user_type AND ";

        $stmt = $this->pdo->prepare("SELECT * FROM lesson_registration WHERE " . $where_user_type . "email=:email AND lesson_date>=:from_date AND lesson_date<=:to_date");
        if (!is_null(static::USER_TYPE)) $stmt->bindValue(':user_type', static::USER_TYPE, PDO::PARAM_STR);
        $stmt->bindValue(':email', $this->email, PDO::PARAM_STR);
        $stmt->bindValue(':from_date', $this->from_date, PDO::PARAM_STR);
        $stmt->bindValue(':to_date', $this->to_date, PDO::PARAM_STR);
        $stmt->execute();
        $row_count = $stmt->rowCount();
        return ($row_count > 0) ? $stmt->fetchAll() : null;
    }

    public function getName(): ?string
    {
        $where_user_type = (is_null(static::USER_TYPE)) ? "" : "user_type=:user_type AND ";

        $stmt = $this->pdo->prepare("SELECT name FROM lesson_registration WHERE " . $where_user_type . "email=:email ORDER BY created DESC LIMIT 1");
        if (!is_null(static::USER_TYPE)) $stmt->bindValue(':user_type', static::USER_TYPE, PDO::PARAM_STR);
        $stmt->bindValue(':email', $this->email, PDO::PARAM_STR);
        $stmt->execute();
        $row_count = $stmt->rowCount();
        return ($row_count === 1) ? $stmt->fetchColumn() : null;
    }
}
