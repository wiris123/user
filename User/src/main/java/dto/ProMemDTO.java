package dto;

import java.util.Date;

//실손보험가입 폼
public class ProMemDTO {
	
	private String idx;
	private String id;
	private String pass;
	private String name;
	private String phone;
	private String mobile;
	private String email;
	private int riskpremium;
	private String enabled;
	private String instype;
	private String ins_name;
	
	//기본 생성자
	public ProMemDTO() {
		super();
	}

	
	public ProMemDTO(String idx, String id, String pass, String name, String phone, String mobile, String email,
			int riskpremium, String enabled, String instype, String ins_name) {
		super();
		this.idx = idx;
		this.id = id;
		this.pass = pass;
		this.name = name;
		this.phone = phone;
		this.mobile = mobile;
		this.email = email;
		this.riskpremium = riskpremium;
		this.enabled = enabled;
		this.instype = instype;
		this.ins_name = ins_name;
	}


	public ProMemDTO(String id, String pass, String name, String phone, String mobile, String email, int riskpremium,
			String enabled, String instype, String ins_name) {
		super();
		this.id = id;
		this.pass = pass;
		this.name = name;
		this.phone = phone;
		this.mobile = mobile;
		this.email = email;
		this.riskpremium = riskpremium;
		this.enabled = enabled;
		this.instype = instype;
		this.ins_name = ins_name;
	}

	public String getIdx() {
		return idx;
	}


	public void setIdx(String idx) {
		this.idx = idx;
	}


	//인자 생성자
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getRiskpremium() {
		return riskpremium;
	}

	public void setRiskpremium(int riskpremium) {
		this.riskpremium = riskpremium;
	}

	public String getEnabled() {
		return enabled;
	}

	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}

	public String getInstype() {
		return instype;
	}

	public void setInstype(String instype) {
		this.instype = instype;
	}

	public String getIns_name() {
		return ins_name;
	}

	public void setIns_name(String ins_name) {
		this.ins_name = ins_name;
	}
	

	
}
