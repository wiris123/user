package com.kosmo.user;

import java.util.ArrayList;

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
		mv.addObject("rows", vo);
		mv.setViewName("/member/login");
		return mv;
	}
	
	/*
	@RequestMapping("/event/bbs_event")
	public String list(Model model,HttpServletRequest req)
	{
		//jdbc template 사용
//		ArrayList<MyBoardDTO> lists = dao.list();		
		//mybatis 사용
		String b_id = req.getParameter("b_id");
		int totalRecordCount = sqlSession.getMapper(MyBbsDAOImpl.class).getTotalCount();
		int pageSize = 4;
		int blockPage = 2;
		int nowPage = req.getParameter("nowPage")==null ? 1 :
			Integer.parseInt(req.getParameter("nowPage"));
		
		int start = (nowPage-1) * pageSize + 1;
		int end = nowPage * pageSize;
		
		String pagingImg = PagingUtil.pagingImgServlet(totalRecordCount,
				pageSize, blockPage, nowPage,req.getContextPath()+"/event/bbs_event.do?");
		
		ArrayList<BoardVO> lists = sqlSession.getMapper(MyBbsDAOImpl.class).listPage(b_id, start, end);
		
		for(BoardVO dto : lists)
		{
			String tmp = dto.getContents().replace("\r\n", "<br/>");
			dto.setContents(tmp);
		}
		
		model.addAttribute("list",lists);
		model.addAttribute("pagingImg",pagingImg);
		
		return "event/bbs_event";
	}*/
}
