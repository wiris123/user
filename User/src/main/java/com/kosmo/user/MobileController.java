package com.kosmo.user;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import interfaceLoader.MobileImpl;
import mybatis.MemberVO;

@Controller
public class MobileController
{
	
	@Autowired
	SqlSession sqlSession;
	
	
	@RequestMapping("/mobile/memberLogin.do")
	@ResponseBody
	public Map<String, Object> memberLogin(HttpServletRequest req)
	{
		Map<String, Object> memberMap  = new HashMap<String, Object>();
		
		String id = req.getParameter("id");
		String pass = req.getParameter("pass");
		
		MemberVO memberVO = sqlSession.getMapper(MobileImpl.class).memberLogin(id, pass);
		
		if(memberVO==null)
		{
			//로그인 실패
			memberMap.put("success", 0);
		}
		else
		{
			//로그인 성공
			memberMap.put("success", 1);
			memberMap.put("memberInfo", memberVO);
			
		}		
		
		return memberMap;
		
	}
	
	
	
	
}
