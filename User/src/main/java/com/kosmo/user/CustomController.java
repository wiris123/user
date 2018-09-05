package com.kosmo.user;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import controller1.CusQnaDAO;
import dto.CounselDTO;

@Controller
public class CustomController {
	
	@RequestMapping("/custom/cus_faq")
	public String cus_faq() {
		
		
		return "custom/cus_faq";
	}
	
	@RequestMapping("/custom/cus_qna")
	public String cus_qna() {
		
		
		return "custom/cus_qna";
	}

	
	@RequestMapping("/custom/cus_qna_email")
	public String cus_qna_email() {
		
		
		
		
		return "custom/cus_qna_email";
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
