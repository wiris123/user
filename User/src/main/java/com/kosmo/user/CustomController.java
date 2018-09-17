package com.kosmo.user;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import controller1.CusQnaDAO;
import dto.CounselDTO;
import mybatis.BoardVO;
import mybatis.MyBbsDAOImpl;
import mybatis.onebyoneVO;

@Controller
public class CustomController {
	
	@Autowired
	private SqlSession sqlSession;
	
	@RequestMapping("/custom/cus_faq")
	public String cus_faq() {
		
		
		return "custom/cus_faq";
	}
	
	@RequestMapping("/custom/cus_qna")
	public String cus_qna() {
		
		
		return "custom/cus_qna";
	}
	
	@RequestMapping("/custom/chat2")
	public String chat() {
		return "custom/cus_chat";
	}
	
	@RequestMapping("/custom/cus_qna_email")
	public String cus_qna_email() {
		
		
		
		
		return "custom/cus_qna_email";
	}
	
	@RequestMapping("/custom/mapAPI")
	public String map_api() {
		
		
		
		
		return "custom/mapAPI";
	}
	
	//1:1상담요청
	@RequestMapping("/custom/onebyone.do")
	public ModelAndView  sendeonebyone(HttpServletRequest request) {
		System.out.println("ss");
		String name =  request.getParameter("name"); 
		String contents =  request.getParameter("contents"); 
		String id = request.getParameter("id");
		String title = request.getParameter("title");
		
		onebyoneVO dto = new onebyoneVO();
		dto.setId(id);
		dto.setName(name);
		dto.setContents(contents);
		dto.setTitle(title);
		
		sqlSession.getMapper(MyBbsDAOImpl.class).response(dto); 
		
		return new ModelAndView("redirect:/custom/response");
	}
	
	@RequestMapping("/custom/sendemail")
	public String sendemail(HttpServletRequest request) {
		System.out.println("아무거나");
		String name =  request.getParameter("name"); 
		String mobile = request.getParameter("mobile");
		String email = request.getParameter("email1")+"@"+request.getParameter("email2");
		String contents =  request.getParameter("contents"); 
		
		CounselDTO dto = new CounselDTO();
		dto.setName(name);
		dto.setMobile(mobile);
		dto.setEmail(email);
		dto.setContents(contents);
		
		CusQnaDAO dao = new CusQnaDAO();
		
		int affected = dao.qnaWrite(dto);		
		
		dao.close();
		
		if(affected==1)
		{ 
			System.out.println("Y");
		}
		else
		{
			System.out.println("N");
		}
		
		
		
		
		return "custom/cus_qna";
	}
	
	
}
