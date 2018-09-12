package com.kosmo.user;

import java.security.Principal;
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
		
		//연금보험 가입 현황 조회
		ArrayList<MyStatusDTO> list3 = sqlSession.getMapper(MyMemberImpl.class).selectMyPageAnnu(id);
		
		mv.addObject("dto", list1);
		
		mv.addObject("member",memVO);
		
		mv.addObject("dto2", list2);
		
		mv.addObject("dto3", list3);
		
		mv.setViewName("member/mypage");
		
		return mv;
	}
}
