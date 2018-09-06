package mybatis;



import java.util.Properties;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.connector.Request;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

public class mail {	
	static JavaMailSender javaMailSender;
	
	@Bean // xml bean 설정을 대신하는 bean
    public static JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        Properties mailProperties = new Properties(); // smtp의 속성 설정
        mailProperties.put("mail.smtp.auth", true);
        mailProperties.put("mail.smtp.starttls.enable", true);
        mailProperties.put("mail.smtp.socketFactory.port", 465);
        mailProperties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        mailProperties.put("mail.smtp.socketFactory.fallback", false);

        mailSender.setJavaMailProperties(mailProperties);
        mailSender.setHost("smtp.gmail.com"); // gmail로 설정
        mailSender.setPort(25); // smtp는 465
        mailSender.setProtocol("smtp"); // 프로토콜을 smtp로
        mailSender.setUsername("chambre1991@gmail.com"); // gmail주소
        mailSender.setPassword("90230as0"); // gmail 비밀번호(틀리면 에러가 난다)
        return mailSender;
    }

	public static void main(String[] args,HttpServletRequest req) {
		
		
	    String name = req.getParameter("name");
	    String mobile = req.getParameter("mobile");
	    String email = req.getParameter("email");
	    String contents = req.getParameter("contents");
	    String mailcontent = name+"</br>"+mobile+"</br>"+email+"</br>"+contents;
		try {
			
			javaMailSender = mail.javaMailSender(); // 위에 생성한 bean을 mailSender로 설정
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
	}
}
