package com.kosmo.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import mybatis.MemberVO;
import mybatis.MyMemberImpl;



@Controller
public class MyBatisController 
{

	@Autowired
	private SqlSession sqlSession;
	//로그인처리
	
	//로그인
	@RequestMapping("/member/login.do")
	public String login(Model model)
	{
		return "member/login";
	}
		
	@RequestMapping("/member/loginAction.do")
	public ModelAndView loginAction(HttpServletRequest req,HttpSession session)
	{
		ModelAndView mv = new ModelAndView();
//			MemberVO vo = dao.login(req.getParameter("id"), req.getParameter("pass"));
		
		//mybatis 사용
		
		
		MemberVO vo =
		sqlSession.getMapper(MyMemberImpl.class).login(req.getParameter("id"), req.getParameter("pass"));
		
		if(vo==null)
		{
			mv.addObject("LoginNG","아이디 패스워드 틀렸어 이짜식아");
			mv.setViewName("/member/login");
			return mv;
		}
		else
		{
			//로그인 성공 시
			session.setAttribute("siteUserInfo", vo);
		}
		
/*		String backUrl = req.getParameter("backUrl");
		
		if(backUrl==null || backUrl.equals(""))
		{
			mv.setViewName("/member/login");
		}
		else
		{
			mv.setViewName(backUrl);
		}
		*/
		mv.setViewName("/member/login");
		return mv;
	}
}
