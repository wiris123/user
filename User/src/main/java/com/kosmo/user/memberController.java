package com.kosmo.user;

import java.security.Principal;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import dto.MyStatusDTO;
import interfaceLoader.MyInsuImpl;
import mybatis.MemberVO;
import mybatis.MyMemberImpl;

@Controller
public class memberController {
	
	@Autowired
	SqlSession sqlSession;
	
	@RequestMapping("/member/join")
	public String join() {
		return "member/join";
	}
	
	@RequestMapping("/member/joinCheck")
	public String joinCheck() {
		return "member/joinCheck";
	}
	
	@RequestMapping("/member/mypage.do")
	public ModelAndView mypage(HttpServletRequest req, HttpSession session) 
	{

		ModelAndView mv = new ModelAndView();
		String id = session.getAttribute("USER_ID").toString();
		System.out.println("id="+id);
		//정기보험의 가입현황 조회
		ArrayList<MyStatusDTO> list1 = sqlSession.getMapper(MyMemberImpl.class).selectMyPageTerm(id);
		
		//회원정보 객체
		MemberVO memVO = sqlSession.getMapper(MyMemberImpl.class).selectMyPageMember(id);
		
		//실손보험 가입현황 조회
		ArrayList<MyStatusDTO> list2 = sqlSession.getMapper(MyMemberImpl.class).selectMyPageProp(id);
		
		mv.addObject("dto", list1);
		
		mv.addObject("member",memVO);
		
		mv.addObject("dto2", list2);
		
		mv.setViewName("member/mypage");
		
		return mv;
	}
	
	//회원가입
	@RequestMapping("/member/insertjoin.do")	 
	public String insertjoin(HttpServletRequest req,HttpSession session)
	{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");	
		String birth = (req.getParameter("birth1")+"-"+req.getParameter("birth2")+"-"+req.getParameter("birth3"));
		Date dat = Date.valueOf(birth);
		
		sqlSession.getMapper(MyMemberImpl.class).insertjoin
		(req.getParameter("id"), req.getParameter("pass"), req.getParameter("name"), req.getParameter("email1")+"@"+req.getParameter("email2"), req.getParameter("mobile1")+req.getParameter("mobile2")+req.getParameter("mobile3") ,dat);

		return "redirect:/member/login.do";
	}
	
		
}
