package com.kosmo.user;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import mybatis.BoardCommVO;
import mybatis.BoardVO;
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
		public String response(Model model, HttpServletRequest req) {
			String b_id = "response";
			int totalRecordCount = sqlSession.getMapper(MyBbsDAOImpl.class).getTotalCount(b_id);
			int pageSize = 10;
			int blockPage = 5;
			int nowPage = req.getParameter("nowPage")==null ? 1 :
				Integer.parseInt(req.getParameter("nowPage"));
			int start = (nowPage-1) * pageSize + 1;
			int end = nowPage * pageSize;
			
			String pagingImg = PagingUtil.paging(totalRecordCount,
					pageSize, blockPage, nowPage,req.getContextPath()+"/custom/bbs_response?");
			
			ArrayList<BoardCommVO> lists = sqlSession.getMapper(MyBbsDAOImpl.class).listresPage(b_id, start, end);
			model.addAttribute("totalCount", totalRecordCount);
			model.addAttribute("list",lists);
			model.addAttribute("pagingImg",pagingImg);
			
			return "event/bbs_response";
		}
}
