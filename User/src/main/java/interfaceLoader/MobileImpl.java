package interfaceLoader;

import java.util.ArrayList;

import dto.MyStatusDTO;
import mybatis.MemberVO;

public interface MobileImpl 
{
	//회원리스트
	public ArrayList<MemberVO> memberList();
	
	//로그인
	public MemberVO memberLogin(String id, String pass);
	
	//보유계약조회
	public ArrayList<MyStatusDTO> selectMyPageAnnu(String id);
	
	//연금보험가입
	public void insertMemberAnnuM(String id,String name,String phone,String mobile,String email,String drive,String cigar,String hospit1, String hospit2,String instype,String ins_name,String monthann,String riskPremium);

	public void insertStatusAnnuM(String id,String insname,String insnum,String remainpay,String paidprem,String prem ,String monthann, String instart,String contstat,String paytime);
}
