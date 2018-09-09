package interfaceLoader;


public interface MyInsuImpl 
{
	public void insertMemberTerm(String id,String pass, String name,String phone,String mobile,String email,String drive,String cigar,String drink,
			String height,String weight,String danhobby,String income,String hospit1,String hospit2,String hospit3,String enabled,String instype,String ins_name);

	public void insertStatusTerm( String id, String	insname, String	insnum, String remainpay,String	paidprem,String	prem, String contstat);
}
