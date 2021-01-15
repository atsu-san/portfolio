package webapp_post_form_sample;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.Normalizer;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/MonthServlet")
public class MonthServlet extends HttpServlet {

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

		String month = req.getParameter("month");

		String wamei[] = { "睦月(むつき)", "如月(きさらぎ)", "弥生(やよひ、やよい)", "卯月(うづき)", "皐月(さつき)", "水無月(みなづき)", "文月(ふづき、ふみづき)", "葉月(はづき)", "長月(ながつき)", "神無月(かみなづき、かんなづき)", "霜月(しもつき)", "師走(しはす、しわす)" };
		String result = "";

		if (isNum(month) && isMonth(Integer.parseInt(month))) {
			result = month + "月の和名は「<span style=\"background-color: yellow;\">" + wamei[Integer.parseInt(month)-1] + "</span>」です。";
		} else {
			result = "1～12の数字を入力してください。";
		}

//		(1) 標準出力
//		System.out.println(result);

//		(2) サーブレット上に出力
//		res.setContentType("text/html;charset=SJIS");;
//		PrintWriter writer = res.getWriter();
//		writer.write("<h1>" + result + "</h1>");
//		writer.close();

//		(3) 別のJSPページに転送
		req.setAttribute("output", result);
		req.getRequestDispatcher("/output.jsp").forward(req, res);

	}

	public static boolean isNum(String number) {
		try {
			Integer.parseInt(number);
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}

	public static boolean isMonth(int number) {
		if ((1 <= number) && (number <= 12)) {
			return true;
		} else {
			return false;
		}
	}
}

