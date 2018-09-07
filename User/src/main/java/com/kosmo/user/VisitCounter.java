package com.kosmo.user;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class VisitCounter{
	public String visitcount(HttpServletRequest req) {
		String result = null;
		HttpSession session = req.getSession(true);
		if(session.getAttribute("VisitCount")==null) {
			session.setAttribute("VisitCount", "1");
			
			result =  "방문자카운트 추가";
		}
		else if(session.getAttribute("VisitCount").toString().equals("1")) {
			result =  "방문자카운트를 이미 하였습니다";
		}
		
		return result;
	}
}
