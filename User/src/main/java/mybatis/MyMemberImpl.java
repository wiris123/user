package mybatis;

import java.sql.Date;

public interface MyMemberImpl 
{
	public MemberVO login(String id, String pass);
	
	public void insertjoin(String id, String pass, String name, String email, String mobile, Date birth);
	
	public void EmailSender(String idx, String name, String mobile, String email, String contents, String flag);
}
