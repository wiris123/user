package com.kosmo.user;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import mybatis.BoardCommVO;
import mybatis.BoardVO;
import mybatis.MemberQVO;
import mybatis.MyBbsDAOImpl;
import mybatis.PagingUtil;

@Controller
public class BbsController {
	
	@Autowired
	private SqlSession sqlSession;
	
	@RequestMapping("/event/bbs_notice")
	public String noticelist(Model model, HttpServletRequest req)
	{
		String b_id = "free";
		int totalRecordCount = sqlSession.getMapper(MyBbsDAOImpl.class).getTotalCount(b_id);
		int pageSize = 10;
		int blockPage = 5;
		int nowPage = req.getParameter("nowPage")==null ? 1 :
			Integer.parseInt(req.getParameter("nowPage"));
		int start = (nowPage-1) * pageSize + 1;
		int end = nowPage * pageSize;
		
		String pagingImg = PagingUtil.paging(totalRecordCount,
				pageSize, blockPage, nowPage,req.getContextPath()+"/event/bbs_notice?");
		
		ArrayList<BoardVO> lists = sqlSession.getMapper(MyBbsDAOImpl.class).listPage(b_id, start, end); 
		model.addAttribute("totalCount", totalRecordCount);
		model.addAttribute("list",lists);
		model.addAttribute("pagingImg",pagingImg);
		
		return "event/bbs_notice";
	}
	
	@RequestMapping("/event/bbs_event")
	public String list(Model model,HttpServletRequest req)
	{
		System.out.println("파일위치 알아보기"+req.getSession().getServletContext().getRealPath("/"));

		String b_id = "photo";
		int totalRecordCount = sqlSession.getMapper(MyBbsDAOImpl.class).getTotalCount(b_id);
		int pageSize = 10;
		int blockPage = 5;
		int nowPage = req.getParameter("nowPage")==null ? 1 :
			Integer.parseInt(req.getParameter("nowPage"));
		
		int start =  1;//(nowPage-1) * pageSize + 1;
		int end = 5; //nowPage * pageSize;
		
		String pagingImg = PagingUtil.paging(totalRecordCount,
				pageSize, blockPage, nowPage,req.getContextPath()+"/event/bbs_event?");
		
		ArrayList<BoardVO> lists = sqlSession.getMapper(MyBbsDAOImpl.class).listPage(b_id, start, end);
		
		model.addAttribute("list",lists);
		model.addAttribute("pagingImg",pagingImg);
		
		return "event/bbs_event";
	}
	
	@RequestMapping("/event/bbs_eventgo")
	public String eventgo(Model model,HttpServletRequest req, HttpSession session) throws ParseException
	{
		MemberQVO vo = new MemberQVO();
		String da = req.getParameter("regidate");
		System.out.println(da);
		SimpleDateFormat frm = new SimpleDateFormat("yyyy-MM-dd");
		Date date = frm.parse(da);
		java.sql.Date dater = new java.sql.Date(date.getTime());
		vo.setRegidate(dater);
		
		
		
		String num = req.getParameter("num");
		vo.setId(session.getAttribute("USER_ID").toString());
		vo.setName(session.getAttribute("USER_NAME").toString());
		vo.setPrmobile("없음");
		vo.setContents("없음");
		vo.setEvent(num);
		sqlSession.getMapper(MyBbsDAOImpl.class).eventgo(vo);
		BoardVO vo2 = new BoardVO();
		vo2 = sqlSession.getMapper(MyBbsDAOImpl.class).listView(num);
		model.addAttribute("vo", vo2);
		model.addAttribute("success", 1);
		return "event/bbs_view";
	}
	
	@RequestMapping("/event/bbs_view")
	public String view(Model model, HttpServletRequest req) {
		BoardVO vo = new BoardVO();
		String num = req.getParameter("num");
		vo = sqlSession.getMapper(MyBbsDAOImpl.class).listView(num);
		model.addAttribute("vo", vo);
		return "event/bbs_view";
	}
	//1:1 응답 게시판
		@RequestMapping("/custom/response")
		public String response(Model model, HttpServletRequest req, HttpSession session) {
			String b_id = "response";
			String id = (String) session.getAttribute("USER_ID");
			System.out.println(id); 
			int totalRecordCount = sqlSession.getMapper(MyBbsDAOImpl.class).getTotalCount2(b_id, id);
			int pageSize = 10;
			int blockPage = 5;
			int nowPage = req.getParameter("nowPage")==null ? 1 :
				Integer.parseInt(req.getParameter("nowPage"));
			int start = (nowPage-1) * pageSize + 1;
			int end = nowPage * pageSize;
			System.out.println(start+ end);
			String pagingImg = PagingUtil.paging(totalRecordCount,
					pageSize, blockPage, nowPage,req.getContextPath()+"/custom/bbs_response?");
			
			ArrayList<BoardCommVO> lists = sqlSession.getMapper(MyBbsDAOImpl.class).listresPage(id, start, end);
			System.out.println("와따요");
			model.addAttribute("totalCount", totalRecordCount);
			model.addAttribute("list",lists);
			model.addAttribute("pagingImg",pagingImg);
			
			return "event/bbs_response";
		}
}
