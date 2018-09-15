package interfaceLoader;

public interface MyInsuImpl
{
	public void insertMemberTerm(String id,String name,String phone,String mobile,String email,String drive,String cigar,String drink,
			String height,String weight,String danhobby,String income,String hospit1,String hospit2,String hospit3,String instype,String ins_name);

	public void insertStatusTerm(String id, String	insname, String	insnum, String remainpay,String	paidprem,String	prem, String contstat, String death_ins);
	
	public void insertMemberProp(String id, String name,String phone,String mobile,String email,int riskPremium, String instype,String ins_name) throws Exception;
	
	public void insertStatusProp(String id, String insname, String insnum, String remainpay,String	paidprem,String	prem, String contstat) throws Exception;

	public void insertMemberAnnu (String id,String name,String phone,String mobile,String email,String drive,String cigar,String hospit1, String hospit2,String instype,String ins_name,String monthann,String riskPremium);

	public void insertStatusAnnu(String id,String insname,String insnum,String remainpay,String paidprem,String prem ,String monthann, String instart,String contstat,String paytime);
	
	public int updateStatus(String insnum,String product);
	
	public int updateStatusDelete(String insnum,String product);
}
