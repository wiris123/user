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

import dto.BookingDTO;
import dto.MyStatusDTO;
import interfaceLoader.MyInsuImpl;
import mybatis.MemberVO;
import mybatis.MyMemberImpl;
import mybatis.MyeventVO;

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
		
		//회원 연령대 구하기
		SimpleDateFormat frm = new SimpleDateFormat("yyyy");
		java.sql.Date sqlDate2 = memVO.getBirth();
		java.sql.Date sqlDate = new java.sql.Date(new java.util.Date().getTime()); 
		int today = Integer.parseInt(frm.format(sqlDate));
		int bday = Integer.parseInt(frm.format(sqlDate2));
		int dae = ((today-bday)/10);
		int gen = dae*10;
		
		//실손보험 가입현황 조회
		ArrayList<MyStatusDTO> list2 = sqlSession.getMapper(MyMemberImpl.class).selectMyPageProp(id);
		
		//연금보험 가입 현황 조회
		ArrayList<MyStatusDTO> list3 = sqlSession.getMapper(MyMemberImpl.class).selectMyPageAnnu(id);
		
		//이벤트 응모현황
		ArrayList<MyeventVO> list6 = sqlSession.getMapper(MyMemberImpl.class).selectMyevent(id);
		
		//이메일 상담 내역
		ArrayList<BookingDTO> list4 = sqlSession.getMapper(MyMemberImpl.class).selectMyMail(id);
		
		//전화 상담 내역
		ArrayList<BookingDTO> list5 = sqlSession.getMapper(MyMemberImpl.class).selectMycall(id);
		
		mv.addObject("dto", list1); //정기
		
		mv.addObject("member",memVO);
		
		mv.addObject("dto2", list2); //실손
		
		mv.addObject("dto3", list3); //연금
		
		mv.addObject("dto4", list4); //이메일
		
		mv.addObject("dto5", list5);//전화
		
		mv.addObject("dto6", list6);
		
		mv.addObject("gen", gen);
		
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
	      
	      sqlSession.getMapper(MyMemberImpl.class).insertjoin(req.getParameter("id"), req.getParameter("pass"), req.getParameter("name"), req.getParameter("email1")+"@"+req.getParameter("email2"), req.getParameter("mobile1")+req.getParameter("mobile2")+req.getParameter("mobile3") ,dat, req.getParameter("address")+req.getParameter("address1")+req.getParameter("address2"));

	      return "redirect:/member/login.do";
	   }
	
	
	
}
