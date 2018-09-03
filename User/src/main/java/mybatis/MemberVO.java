package mybatis;

import java.util.Date;

//회원
public class MemberVO {

	private String id;
	private String pass;
	private String name;
	private String email;
	private String mobile;
	private Date birth;
	private Date regidate;
	
	//기본 생성자
	public MemberVO() 
	{
		super();
	}
	
	//인자 생성자

	public MemberVO(String id, String pass, String name, String email, String mobile, Date birth, Date regidate) {
		super();
		this.id = id;
		this.pass = pass;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.birth = birth;
		this.regidate = regidate;
	}


	public MemberVO(String id, String pass, String name, String email, String mobile, Date birth) {
		super();
		this.id = id;
		this.pass = pass;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.birth = birth;
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
	public Date getBirth() {
		return birth;
	}
	public void setBirth(Date birth) {
		this.birth = birth;
	}
	public Date getRegidate() {
		return regidate;
	}
	public void setRegidate(Date regidate) {
		this.regidate = regidate;
	}
	
	
}
