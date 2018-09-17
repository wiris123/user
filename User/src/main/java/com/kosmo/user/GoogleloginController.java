package com.kosmo.user;



import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.google.api.Google;
import org.springframework.social.google.api.impl.GoogleTemplate;
import org.springframework.social.google.api.plus.Person;
import org.springframework.social.google.api.plus.PlusOperations;
import org.springframework.social.google.connect.GoogleConnectionFactory;
import org.springframework.social.oauth2.AccessGrant;
import org.springframework.social.oauth2.GrantType;
import org.springframework.social.oauth2.OAuth2Operations;
import org.springframework.social.oauth2.OAuth2Parameters;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.sun.corba.se.pept.transport.Connection;

/**
 * Handles requests for the application home page.
 */
@Controller
public class GoogleloginController 
{

	/* GoogleLogin */
	@Autowired
	private GoogleConnectionFactory googleConnectionFactory;
	
	@Autowired
	private OAuth2Parameters googleOAuth2Parameters;

	// 로그인 첫 화면 요청 메소드
	@RequestMapping(value = "/snslogin/googlelogin.do", method = { RequestMethod.GET, RequestMethod.POST })
	public String login(Model model, HttpSession session) {

		/* 구글code 발행 */
		OAuth2Operations oauthOperations = googleConnectionFactory.getOAuthOperations();
		String url = oauthOperations.buildAuthorizeUrl(GrantType.AUTHORIZATION_CODE, googleOAuth2Parameters);

		System.out.println("구글:" + url);

		model.addAttribute("google_url", url);

		/* 생성한 인증 URL을 View로 전달 */
		return "snslogin/googlelogin";
	}

	// 구글 Callback호출 메소드
	   @RequestMapping(value = "/oauth2callback", method = { RequestMethod.GET, RequestMethod.POST })
	   public String googleCallback(Model model, @RequestParam String code) throws IOException 
	   {
	      
	      OAuth2Operations oauthOperations = googleConnectionFactory.getOAuthOperations(); 
	      AccessGrant accessGrant = oauthOperations.exchangeForAccess(code, googleOAuth2Parameters.getRedirectUri(), null); 
	      String accessToken = accessGrant.getAccessToken(); 
	      Long expireTime = accessGrant.getExpireTime(); 
	      if (expireTime != null && expireTime < System.currentTimeMillis()) { accessToken = accessGrant.getRefreshToken(); 
	      
	      } 
	      org.springframework.social.connect.Connection<Google>connection = googleConnectionFactory.createConnection(accessGrant); 
	      Google google = connection == null ? new GoogleTemplate(accessToken) : connection.getApi(); 
	      PlusOperations plusOperations = google.plusOperations(); 
	      Person person = plusOperations.getGoogleProfile();
	      
	      
	      String account = person.getAccountEmail();
	      model.addAttribute("person", person);
	      model.addAttribute("account", account);   
	      String name = person.getDisplayName();
	      model.addAttribute("name", name);
	      System.out.println(account + name);
	      model.addAttribute("birthday", person.getBirthday());

	      return "member/mypage";
	      
	   }
	
	/*@RequestMapping("/snslogin/google.do")
	public String google(Model model) {
			
		return "../snslogin/googlelogin";
		 
	}*/
}
