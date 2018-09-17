package mybatis;

import java.util.Date;

//회원
public class MemberVO {

	private String id;
	private String pass;
	private String name;
	private String email;
	private String mobile;
	private java.sql.Date birth;
	private Date regidate;
	private String address;
	
	//기본 생성자
	public MemberVO() 
	{
		super();
	}
	
	//인자 생성자

	public MemberVO(String id, String pass, String name, String email, String mobile, java.sql.Date birth, Date regidate, String address) {
		super();
		this.id = id;
		this.pass = pass;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.birth = birth;
		this.regidate = regidate;
		this.address = address;
	}


	public MemberVO(String id, String pass, String name, String email, String mobile, java.sql.Date birth, String address) {
		super();
		this.id = id;
		this.pass = pass;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.birth = birth;
		this.address = address;
	}

	public String getaddress() {
		return address;
	}

	public void setaddress(String address) {
		this.address = address;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public java.sql.Date getBirth() {
		return birth;
	}
	public void setBirth(java.sql.Date birth) {
		this.birth = birth;
	}
	public Date getRegidate() {
		return regidate;
	}
	public void setRegidate(Date regidate) {
		this.regidate = regidate;
	}
	
	
}
