import { isEmpty } from 'lodash';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUserAuth } from '../../Redux/Action/AuthenticationAction';
import { AUTH_CREATE_FAILURE } from '../../common/constant';

const Register = () => {
  const navigate =useNavigate()
  const dispatch=useDispatch()
  const {currentUser,AuthFailure} = useSelector((state)=>state.AuthenticationReducer)
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      mobile: "",
      password: "",
      role: currentUser?.role ==="superAdmin"?"mediaAdmin":currentUser?.role==="mediaAdmin"?"Journalist":"",
    });
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
          ...(currentUser?.role ==="mediaAdmin"&&{ mediaAdmin:currentUser?._id}
          )
        }
        console.log('formData: ', submitData);
       await dispatch(RegisterUserAuth(submitData,navigate))
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


  const mediaOptions = [
    { id: 1, name: 'Image 1', url: 'https://example.com/path/to/image1.jpg' },
    { id: 2, name: 'Image 2', url: 'https://example.com/path/to/image2.jpg' },
    { id: 3, name: 'Video 1', url: 'https://example.com/path/to/video1.mp4' },
    { id: 4, name: 'Video 2', url: 'https://example.com/path/to/video2.mp4' },
];
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
                <h4 className="mt-1 mb-5 pb-1">{currentUser?.role==="superAdmin"?"Create MediaAdmin":currentUser?.role==="mediaAdmin"?"Create Journalist":"Register"}</h4>
              </div>
              <form onSubmit={handleSubmit}>
              {inputs.map((item, i) => renderedInputs(item, i))}
              <div  className="form-outline mb-4">
        <label className="form-label" htmlFor={"role"}>Media</label>
        <input
          id='role'
          name="role"
          className="form-control"
          value={formData?.role}
          readOnly
        />
      </div>
      <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="role">Role</label>
                                            <select
                                                id="role"
                                                name="role"
                                                className="form-control"
                                                value={formData.role}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select a media</option>
                                                {mediaOptions.map(media => (
                                                    <option key={media.id} value={media.url}>
                                                        {media.name} {/* Display the media name or title */}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                <div className="d-flex justify-content-end ">
                  <button className="btn btn-primary mb-3" type="submit">Submit</button>
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
  </section>
  )
}

export default Register