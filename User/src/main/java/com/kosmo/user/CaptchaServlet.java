package com.kosmo.user;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import nl.captcha.Captcha;



@Controller
public class CaptchaServlet  
{
 
	private static final Logger logger =LoggerFactory.getLogger(CaptchaServlet.class);
	

	//참고 사이트 http://zero-gravity.tistory.com/243
	
	@RequestMapping("/captcha.do")
	@ResponseBody
    protected void captcha(HttpServletRequest request, HttpServletResponse response) 
    			throws ServletException, IOException {
 
        try {
            // 200 * 50 에해당하는 이미지 사이즈를 지정하고, 자동가입방지 문자 길이를 설정한다.
            Captcha captcha = new Captcha.Builder(250, 60)
                                    .addText()
                                    .addBackground()
                                    .addNoise()
                                    .addBorder()
                                    .build();
 
            response.setHeader("Cache-Control", "no-store");
            response.setHeader("Pragma", "no-cache");
            // 캐쉬를 지우기 위해 헤더값을 설정
            response.setDateHeader("Expires", 0);
            // 리턴값을 image형태로 설정
            response.setContentType("image/jpeg");
            // Image를 write 한다
            CaptchaServletUtil.writeImage(response, captcha.getImage());
            // 세션에 자동가입방지 문자를 저장한다.
            request.setAttribute("correctAnswer", captcha.getAnswer());
            
            logger.info("captcha 자동가입방지 문자 : CAPTCHA :" + captcha.getAnswer());
            
            CapCharConfirm.CAPTCHA =captcha.getAnswer();
           
            logger.info("CAPTCHA CAPTCHA :" + CapCharConfirm.CAPTCHA);
         
            
            System.out.println( "실행완료");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println(e.getStackTrace());
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);    
        }
 
    }
	
	
	
 
}


