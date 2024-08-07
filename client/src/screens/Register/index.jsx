import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RegisterUserAuth } from '../../Redux/Action/AuthenticationAction';
import { AUTH_CREATE_FAILURE } from '../../common/constant';
import Modal from 'react-modal';
import fetchData from '../../http/api';
import { customStyles } from '../../common/common';

const Register = () => {
  const {id} =useParams()
  const {getmediaAdmin} = useSelector((state)=>state.NewsReducer)
  const {token} = useSelector((state)=>state.AuthenticationReducer)
  const [user, setUser] = useState([])

  const getJournalists =async()=>{
      const res =await fetchData('/journalist','get',null,{Authorization:token})
      setUser(res?.user)
  } 
  
  useEffect(() => {
    if(isEmpty(token)){
    getJournalists()
    }
  },[token])

  const navigate =useNavigate()
  const dispatch=useDispatch()
  const {currentUser,AuthFailure} = useSelector((state)=>state.AuthenticationReducer)
    const [ModalOpen, setModalOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      mobile: "",
      password: "",
      role: currentUser?.role ==="superAdmin"?"mediaAdmin":currentUser?.role==="mediaAdmin"?"Journalist":currentUser === null && "user",
    });

    const roleChange=currentUser?.role ==="superAdmin"?"/admin":currentUser?.role==="mediaAdmin"?"/mediaAdmin" :currentUser?.role==="Journalist"?"/Journalist":"/login"
  
    const inputs= [{
        "id": "name",
        "label": "User Name",
        "name": "name",
        "type": "text",
        "placeholder": "name",
        "isrequired": true
      },
      {
        "id": "email",
        "label": "Email",
        "name": "email",
        "type": "text",
        "placeholder": "email",
        "isrequired": true,
        "ispattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
      },
      {
        "id": "mobile",
        "label": "Mobile Number",
        "name": "mobile",
        "type": "text",
        "maxLength": 10,
        "placeholder": "mobile",
        "isrequired": true
      },
      {
        "id": "password",
        "label": "Password",
        "name": "password",
        "type": "password",
        "placeholder": "password",
        "isrequired": true
  }]

  const renderedInputs = (item) => {
    return (
      <div key={item.name} className="form-outline mb-4">
        <label className="form-label" htmlFor={item.id}>
          {item.label}
        </label>
        <input
          id={item.id}
          type={item.type}
          name={item.name}
          className="form-control"
          placeholder={item.placeholder}
          onChange={handleChange}
          maxLength={item.maxLength}
          value={formData[item.id]}
        />
      </div>
    );
};

const handleValidation = (e) => {
    let error = {};
      inputs.forEach((rule) => {
        const { name, label, isrequired, ispattern } = rule;
        const value = formData[name];
        if (!value && isrequired) {
          error[name] = `${label} is required`;
        } else if (ispattern && !RegExp(ispattern).test(value)) {
          error[name] = `${label} is Invalid`;
        } 
      })
      return error;
    }
    
    const handleSubmit=async(e)=>{
      e.preventDefault()
      const valid = handleValidation()
      if(!isEmpty(valid)){
        setErrors(valid)
      }else{
        const submitData = {...formData,
          ...(currentUser?.role ==="mediaAdmin"&&{ mediaAdmin:currentUser?._id})
        }
       await dispatch(RegisterUserAuth(submitData,navigate,setModalOpen))
      }
    }


const handleChange = (e) => {
    const { name, value, type, id } = e.target;
    const numericValue = value.replace(/\D/g, "");
    name === "mobile"
      ? setFormData({ ...formData, [name]: numericValue })
      : setFormData({ ...formData, [name]: type === "radio" ? id : value });
    setErrors({ ...errors, [name]: "" });
  dispatch({type:AUTH_CREATE_FAILURE,payload:false})
  };


  const filteredData=[
    ...getmediaAdmin,
    ...user
  ]
  
  const filteredResult= filteredData?.find(admin=>admin?._id === id)

  useEffect(() => {
   setFormData({
    name: filteredResult?.name,
    email: filteredResult?.email,
    mobile:filteredResult?.mobile,
    password: filteredResult?.password,
    role: currentUser?.role ==="superAdmin"?"mediaAdmin":currentUser?.role==="mediaAdmin"?"Journalist":currentUser === null && "user",
  })
  }, [id,currentUser])

  const handleUpdate=async()=>{
    const submitData = {...formData,
      ...(currentUser?.role ==="mediaAdmin"&&{ mediaAdmin:currentUser?._id}
      )
    }
    // console.log('formData: ', submitData);
  //  await dispatch(RegisterUserAuth(submitData,navigate,setModalOpen))
  }
  


  return (
    <section className="gradient-form d-flex justify-content-center align-items-center"style={{ height: "100vh" }}>
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card rounded-3 text-black">
            <div className="card-body p-md-5 mx-md-4">
              <div className="text-center">
                {Object.keys(errors).length > 0 && (
                  <div style={{background: "rgb(230, 190, 199)"}}>
                    {Object.entries(errors).map(([key, value]) => (
                      <li key={key} style={{ display: value ? "" : "none" }}>
                        {value}
                      </li>
                    ))}
                  </div>
                )}
                {AuthFailure && (
                  <div className="text-center">
                    <span style={{ color: "red" }}>{AuthFailure}</span>
                  </div>
                )}
            {  id  ?
                <h4 className="mt-1 mb-5 pb-1">{currentUser?.role==="superAdmin"?"update MediaAdmin":currentUser?.role==="mediaAdmin"?"update Journalist":"Update"}</h4>:
                <h4 className="mt-1 mb-5 pb-1">{currentUser?.role==="superAdmin"?"Create MediaAdmin":currentUser?.role==="mediaAdmin"?"Create Journalist":"Register"}</h4>
             } </div>
              <form onSubmit={id?handleUpdate:handleSubmit}>
              {inputs.map((item, i) => renderedInputs(item, i))}
              {currentUser !== null&&
              <div  className="form-outline mb-4">
        <label className="form-label" htmlFor={"role"}>Media</label>
        <input
          id='role'
          name="role"
          className="form-control"
          value={formData?.role}
          readOnly
        />
      </div>}
                <div className="d-flex justify-content-end ">
                  <button className="btn btn-primary mb-3" type="submit">{id?"Update":"Submit"}</button>
                </div>
              </form>
              {(currentUser?.role !=="superAdmin" && currentUser?.role !=="mediaAdmin")&&
              <div className="text-center">
             <span>Already have account?</span><Link to="/login" className="small"> Login</Link>
           </div>}
            </div>
          </div>
        </div>
      </div>
    </div>

      <Modal isOpen={ModalOpen} style={customStyles} onRequestClose={() => setModalOpen(false)}>
        <div className="modal-content align-items-center justify-content-center">
          <div className="modal-body text-center">
            <h5 className="modal-title mb-4"></h5>
            <p>{id?`${formData?.role} Updated Successfully`:`${formData?.role} Created Successfully`}</p>
            <div className="modal-footer mt-3">
              <button className="btn btn-secondary mx-2" onClick={() =>{ setModalOpen(false)
                navigate(roleChange)}}>Close</button>
            </div>
          </div>
        </div>
      </Modal>
  </section>
  )
}

export default Register