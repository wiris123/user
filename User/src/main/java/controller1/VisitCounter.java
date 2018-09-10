package controller1;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import javax.sql.DataSource;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class VisitCounter implements HttpSessionListener 
{
	Connection con; // 오라클 서버와 연결할때 사용
	PreparedStatement psmt;// 오라클 서버와 쿼리전송 역할
	ResultSet rs;

	@Override
	public void sessionCreated(HttpSessionEvent arg0) {
		System.out.println("접속완료");
		HttpSession session = arg0.getSession();
		// 루트 컨텍스트 가져옴
		WebApplicationContext wac = WebApplicationContextUtils
				.getRequiredWebApplicationContext(session.getServletContext());
		// 리퀘스트 가져옴
		HttpServletRequest req = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		// request를 파라미터에 넣지 않고도 사용할수 있도록 설정
		DataSource datasource = (DataSource) wac.getBean("dataSource");

		// 보낼 정보를 담는다
		String ip = req.getRemoteAddr();
		String from = req.getHeader("referer");
		if (from == null) {
			from = "URL을 통한 직접접근";
		}
		// 디비연결

		try {
			con = datasource.getConnection();
			System.out.println("DBCP연결성공");
			if (check(ip)) {
				// 새로운 접속자일 경우 디비에 데이터 입력
				newcome(ip, from);
			} else {

			}
			close();
		} catch (SQLException e) {
			System.out.println("DBCP연결실패");
			e.printStackTrace();
		}

	}

	@Override
	public void sessionDestroyed(HttpSessionEvent arg0) {
		// TODO Auto-generated method stub
	}

	private void close() {
		try {
			if (rs != null)
				rs.close();
			if (psmt != null)
				psmt.close();
			if (con != null)
				con.close();
		} catch (Exception e) {
			System.out.println("자원반납시 예외발생");
			e.printStackTrace();
		}
	}

	private void newcome(String ip, String from) throws SQLException {
		String query = "insert into VISITOR(VISIT_IDX, VISIT_IP, VISIT_DATE, VISIT_FROM) values (VISITOR_SEQ.NEXTVAL, ? , sysdate, ?)";
		psmt = con.prepareStatement(query);
		psmt.setString(1, ip);
		psmt.setString(2, from);
		psmt.executeUpdate();

	}

	private boolean check(String ip) throws SQLException {
		String query = "select max(to_char(visit_date, 'YY/MM/DD' )) from visitor group by visit_ip having visit_ip = ?";
		psmt = con.prepareStatement(query);
		psmt.setString(1, ip);
		rs = psmt.executeQuery();

		Date date = new Date();
		SimpleDateFormat dt1 = new SimpleDateFormat("YY/MM/dd");
		if (rs.next()) {
			String olddate = rs.getString(1);
			String newdate = dt1.format(date);
			if (!olddate.equals(newdate)) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
}