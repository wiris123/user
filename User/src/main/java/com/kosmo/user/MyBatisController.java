package com.kosmo.user;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import mybatis.BoardVO;
import mybatis.MemberVO;
import mybatis.MyMemberImpl;
import mybatis.PagingUtil;
import mybatis.MyBbsDAOImpl;



@Controller
public class MyBatisController 
{

	
	@Autowired
	private SqlSession sqlSession;
	//로그인처리

	
	//로그인 리다이렉팅
	@RequestMapping("/member/login.do")
	public String login(Model model)
	{
		return "member/login";
	}
		
	
	
	//로그인 처리
	@RequestMapping("/member/loginAction.do")
	public ModelAndView loginAction(HttpServletRequest req,HttpSession session)
	{
		ModelAndView mv = new ModelAndView();

		
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
			
		}
		
		
		//로그인 성공 시
		session.setAttribute("userInfo", vo);
		mv.addObject("rows", vo);
		
		mv.setViewName("/member/login");
		return mv;
	}
	
	
	@RequestMapping("/event/bbs_event")
	public String list(Model model,HttpServletRequest req)
	{
		//jdbc template 사용
		ArrayList<MyBoardDTO> lists = dao.list();		
		//mybatis 사용
		String b_id = req.getParameter("b_id");
		int totalRecordCount = sqlSession.getMapper(MyBbsDAOImpl.class).getTotalCount(b_id);
		int pageSize = 4;
		int blockPage = 2;
		int nowPage = req.getParameter("nowPage")==null ? 1 :
			Integer.parseInt(req.getParameter("nowPage"));
		
		int start =  1;//(nowPage-1) * pageSize + 1;
		int end = 5; //nowPage * pageSize;
		
		String pagingImg = PagingUtil.paging(totalRecordCount,
				pageSize, blockPage, nowPage,req.getContextPath()+"/event/bbs_event.do?");
		
		ArrayList<BoardVO> lists = sqlSession.getMapper(MyBbsDAOImpl.class).listPage(b_id, start, end);
		
	 for(BoardVO dto : lists)
		{
			String tmp = dto.getContents().replace("\r\n", "<br/>");
			dto.setContents(tmp);
		}*/
		
		model.addAttribute("list",lists);
		model.addAttribute("pagingImg",pagingImg);
		
		return "event/bbs_event";
	}

	
	@RequestMapping("/member/insertjoin.do")	 
	public String insertjoin(HttpServletRequest req,HttpSession session)
	{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");	
		String birth = (req.getParameter("birth1")+"-"+req.getParameter("birth2")+"-"+req.getParameter("birth3"));
		Date dat = Date.valueOf(birth);
		
		sqlSession.getMapper(MyMemberImpl.class).insertjoin
				(req.getParameter("id"), req.getParameter("pass"), req.getParameter("name"), req.getParameter("email1")+"@"+req.getParameter("email2"), req.getParameter("mobile1")+req.getParameter("mobile2")+req.getParameter("mobile3") ,dat);
			

		
		return "redirect:/member/login";
	}
	
}
