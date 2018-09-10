package com.kosmo.user;

import java.security.Principal;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Locale;

import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import mybatis.BoardVO;
import mybatis.EmailVO;
import mybatis.MemberVO;
import mybatis.MyMemberImpl;
import mybatis.PagingUtil;
import mybatis.MyBbsDAOImpl;



@Controller
public class MyBatisController 
{

	
	@Autowired
	private SqlSession sqlSession;
	//메일 처리를 위한 빈즈
	@Autowired
	private JavaMailSender javaMailSender;
	
	//로그인처리

	
	//로그인 리다이렉팅
	@RequestMapping("/member/login.do")
	public String login()
	{
	
		
		return "member/login";
	}
		
	//로그인 성공시
	@RequestMapping("/member/loginSuccess.do")
	public String loginSuc(HttpSession session)
	{
		
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;

		String user_id = userDetails.getUsername();
		
		session.setAttribute("USER_ID", user_id);
		
		return "member/login";
		
	}
	//접근 거부 페이지
	@RequestMapping("/member/accessDenied")
	public String accessDenied() {
		return "member/accessDenied";
	}
			
	
	//로그인 처리
	/*@RequestMapping("/member/loginAction.do")
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

		
		//로그인 성공 시
		session.setAttribute("userInfo", vo);
		mv.addObject("rows", vo);
		
		mv.setViewName("/member/login");
		return mv;
	}
*/
	
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
	
	
	//메일 처리를 위한 컨트롤러 매핑
	@RequestMapping("custom/mailTest.do")
	public String mailTest(HttpServletRequest req, HttpServletResponse resp,EmailVO emailvo) {
		
	    String idx = "1";
	    String name = req.getParameter("name");
	    String mobile = req.getParameter("mobile1")+req.getParameter("mobile2");
	    String email = req.getParameter("email1")+"@"+req.getParameter("email2");
	    String contents = req.getParameter("contents");
	    String flag = "mail";
	    String mailcontent = name+"</br>"+mobile+"</br>"+email+"</br>"+contents;
	    System.out.println(name);
	    System.out.println(contents);
		try {
			sqlSession.getMapper(MyMemberImpl.class).EmailSender(req.getParameter("idx"),req.getParameter("name"),(req.getParameter("mobile1")+req.getParameter("mobile2")),(req.getParameter("email1")+"@"+req.getParameter("email2")),contents,flag);
			MimeMessage message = javaMailSender.createMimeMessage(); // 메일 생성
			message.setSubject("Mail Test");	// 제목 설정
			message.setText(mailcontent,"UTF-8","html");	// 내용(html 준수)
			message.setRecipients(RecipientType.TO,"chambre1991@gmail.com"); // 받는 사람 설정
			javaMailSender.send(message); // 메일 보내기
			System.out.println("성공");
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("실패");
		}
	
		return "redirect:/custom/cus_qna";
	}
	
}
