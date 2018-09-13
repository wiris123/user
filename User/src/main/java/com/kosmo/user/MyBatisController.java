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
import org.junit.experimental.theories.DataPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.social.google.connect.GoogleConnectionFactory;
import org.springframework.social.oauth2.GrantType;
import org.springframework.social.oauth2.OAuth2Operations;
import org.springframework.social.oauth2.OAuth2Parameters;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
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

	MyMemberImpl inter;
	
	@Autowired
	private SqlSession sqlSession;
	//메일 처리를 위한 빈즈
	@Autowired
	private JavaMailSender javaMailSender;
	
	

	//로그인처리
	/* NaverLoginBO */
	private NaverLoginBO naverLoginBO;
	private String apiResult = null;
	
	@Autowired
	private void setNaverLoginBO(NaverLoginBO naverLoginBO) {
		this.naverLoginBO = naverLoginBO;
	}
	/* GoogleLogin */
	@Autowired
	private GoogleConnectionFactory googleConnectionFactory;
	
	@Autowired
	private OAuth2Parameters googleOAuth2Parameters;

	//로그인 리다이렉팅
	@RequestMapping("/member/login.do")
	public String login(HttpSession session,Model model)
	{
		/* 네이버아이디로 인증 URL을 생성하기 위하여 naverLoginBO클래스의 getAuthorizationUrl메소드 호출 */
		String naverAuthUrl = naverLoginBO.getAuthorizationUrl(session);
		
		//https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=sE***************&
		//redirect_uri=http%3A%2F%2F211.63.89.90%3A8090%2Flogin_project%2Fcallback&state=e68c269c-5ba9-4c31-85da-54c16c658125
		System.out.println("네이버:" + naverAuthUrl);
		
		//네이버 
		model.addAttribute("url", naverAuthUrl);
		
		/* 구글code 발행 */
		OAuth2Operations oauthOperations = googleConnectionFactory.getOAuthOperations();
		String url = oauthOperations.buildAuthorizeUrl(GrantType.AUTHORIZATION_CODE, googleOAuth2Parameters);

		System.out.println("구글:" + url);

		model.addAttribute("google_url", url);

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
			
	
	//로그인 처리 - 시큐리티를 사용하지 않은 로그인 처리
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
	
	
	//유저정보 수정
    @RequestMapping("member/modifygo.do")
    public String modify(HttpServletRequest req) {
    	return "member/modify";
    }
    
    @RequestMapping("member/modify.do")
    public String update(HttpServletRequest req,HttpSession session)
    {
    	String id = session.getAttribute("USER_ID").toString();
    	String name = req.getParameter("name");
        String pass = req.getParameter("pass");        
        String email = req.getParameter("email1")+"@"+req.getParameter("email2");
        String mobile = req.getParameter("mobile1")+req.getParameter("mobile2")+req.getParameter("mobile3");
       
        System.out.println(id+pass+name+email+mobile);
        System.out.println("들어가자");
    
        sqlSession.getMapper(MyMemberImpl.class).update(id,pass,name,email, mobile);
        
        return "redirect:/member/mypage.do";
    }	

    //수정,삭제전 패스워드 확인페이지
    @RequestMapping("/member/delete.do")
	public String PwCheckform(HttpSession session, HttpServletRequest request, Model model) {
		
		String pass = (String) session.getAttribute("pass");
		String id = request.getParameter("id");
		
		model.addAttribute("pass", pass);
		model.addAttribute("id", id);
		
		System.out.println("checkpw id/pass/type>>" + id + "/" + pass + "/");
		return "member/delete";
	}

	
    

	//패스워드 검증
	@RequestMapping("/member/deletemember.go")
	public ModelAndView passwordAction(HttpServletRequest req,MemberVO vo){
		ModelAndView mv = new ModelAndView();
		//파라미터 받기
		String id = req.getParameter("id");
		String pass = req.getParameter("pass");
		
		vo = sqlSession.getMapper(MyMemberImpl.class).passCheck(pass);
		
		if(vo==null)
		{
			mv.addObject("LoginNG");
			mv.setViewName("member/delete");
		}
		
		sqlSession.getMapper(MyMemberImpl.class).delete(id);
		mv.setViewName("/member/login");
		
		return mv;
		
	}
	
}


/*@Service
public class UserSerivce implements UserDetailsService 
{

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CustomUser customUser = null;
        // ... DB 등을 통해 사용자 정보를 셋팅

        return customUser;
}
    
@DataPoint
public class CustomUser implements UserDetails 
{
    // ...
}*/
