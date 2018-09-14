package mybatis;

import java.sql.Date;
import java.util.ArrayList;

import dto.MyStatusDTO;

public interface MyMemberImpl 
{
	public MemberVO login(String id, String pass);
	
	public void insertjoin(String id, String pass, String name, String email, String mobile, Date birth, String address);
	
	public void EmailSender(String idx, String name, String mobile, String email, String contents, String flag);
	
	public ArrayList<MyStatusDTO> selectMyPageTerm(String id);
	
	public MemberVO selectMyPageMember(String id);

	public ArrayList<MyStatusDTO> selectMyPageProp(String id);
	
	public ArrayList<MyStatusDTO> selectMyPageAnnu(String id);
	
	public int idCheck(String id);
	
	public void update(String id, String pass,String name,String email,String mobile);
	
	public MemberVO passCheck(String pass);
	
	public void delete(String id);
	
	public void calling(String idx, String name, String mobile, String telltime, String contents, String flag);
}
