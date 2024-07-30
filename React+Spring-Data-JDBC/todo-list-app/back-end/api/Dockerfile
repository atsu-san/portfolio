# ビルドステージ
FROM gradle:7.6-jdk17 AS builder

# 作業ディレクトリを設定
WORKDIR /app

# Gradle の設定ファイルをコピー
COPY settings.gradle build.gradle ./
COPY gradle gradle

# ソースコードをコピー
COPY src src

# JAR ファイルをビルド（テストスキップ）
RUN gradle build --no-daemon -x test

# 実行ステージ
FROM openjdk:17-jdk-alpine

# 作業ディレクトリを設定
WORKDIR /app

# ビルドステージから JAR ファイルをコピー
COPY --from=builder /app/build/libs/api-0.0.1-SNAPSHOT.jar /api-0.0.1-SNAPSHOT.jar

# アプリケーションのエントリーポイントを指定
ENTRYPOINT ["java", "-jar", "/api-0.0.1-SNAPSHOT.jar"]

