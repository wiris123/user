package interfaceLoader;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

@Service
public class MyInsuService implements MyInsuImpl
{
	SqlSession sqlSession;
	
@Override
public void insertMemberAnnu(String id, String name, String phone, String mobile, String email, String drive,
		String cigar, String hospit1, String hospit2, String instype, String ins_name, String monthann,
		String riskPremium) {
	// TODO Auto-generated method stub
	
}

@Override
	public void insertStatusAnnu(String id, String insname, String insnum, String remainpay, String paidprem,
			String prem, String monthann, String instart, String contstat, String paytime) {
		// TODO Auto-generated method stub
		
	}

@Override
	public void insertMemberProp(String id, String name, String phone, String mobile, String email, int riskPremium,
			String instype, String ins_name) throws Exception {
	sqlSession.getMapper(MyInsuImpl.class).insertMemberProp(id, name,  phone,  mobile,  email, riskPremium, instype, ins_name);
		
	}

@Override
public void insertStatusProp(String id, String insname, String insnum, String remainpay, String paidprem,
		String prem, String contstat) throws Exception {
	sqlSession.getMapper(MyInsuImpl.class).insertStatusProp(id, insname, insnum, remainpay, paidprem, prem, contstat); 
	
}


@Override
	public void insertMemberTerm(String id, String name, String phone, String mobile, String email, String drive,
			String cigar, String drink, String height, String weight, String danhobby, String income, String hospit1,
			String hospit2, String hospit3, String instype, String ins_name) {
		// TODO Auto-generated method stub
		
	}


@Override
	public void insertStatusTerm(String id, String insname, String insnum, String remainpay, String paidprem,
			String prem, String contstat, String death_ins) {
		// TODO Auto-generated method stub
		
	}

@Override
	public int updateStatus(String insnum, String product) {
		// TODO Auto-generated method stub
		return 0;
	}

@Override
	public int updateStatusDelete(String insnum, String product) {
		// TODO Auto-generated method stub
		return 0;
	}






}
