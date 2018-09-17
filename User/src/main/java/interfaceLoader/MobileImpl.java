package interfaceLoader;

import java.util.ArrayList;

import mybatis.MemberVO;

public interface MobileImpl 
{
	//회원리스트
	public ArrayList<MemberVO> memberList();
	
	//로그인
	public MemberVO memberLogin(String id, String pass);
	
	
}
