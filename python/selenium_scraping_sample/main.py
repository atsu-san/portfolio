def main():

    try:

        import random
        from selenium import webdriver
        from selenium.webdriver.common.by import By
        from selenium.webdriver.common.keys import Keys
        from selenium.webdriver.support.ui import WebDriverWait
        from selenium.webdriver.support import expected_conditions as EC
        from selenium.common.exceptions import TimeoutException

        chromedriver_path = 'C:\\Program Files (x86)\\ChromeDriver\\chromedriver.exe'

        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
            'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
        ]

        user_agent = user_agents[random.randrange(len(user_agents))]
        chromedriver_options = webdriver.ChromeOptions()
        chromedriver_options.add_argument('--user-agent=' + user_agent)

        # Suppress the "Getting Default Adapter failed" message
        chromedriver_options.add_experimental_option('excludeSwitches', ['enable-logging'])

        driver = webdriver.Chrome(
            executable_path=chromedriver_path, options=chromedriver_options)
        
        input_value = input("Please enter a book title or author's name: ")
        
        # driver.get("http://localhost/hon.suki2.net")
        driver.get("https://hon.suki2.net")

        print("Scraping started.\n")
        print("[PAGE TITLE]")
        print(driver.title)
        print("\n[CONTENT]")

        search_word = driver.find_element(By.NAME, "search_word")
        search_word.send_keys(input_value + Keys.RETURN)

        book_result_table = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.ID, "book_result_table"))
        )

        rows = book_result_table.find_elements_by_tag_name("tr")

        for row in rows:
            print(row.text)
            print("--------------------------------------------------")

    except TimeoutException:
        print(
            "\n[MESSAGE]\nNo result found. Please try again with a different keyword.")
    else:
        print("\n[MESSAGE]\nSuccess")
    finally:
        print("\nScraping ended.")
        driver.quit()


if __name__ == "__main__":
    main()
