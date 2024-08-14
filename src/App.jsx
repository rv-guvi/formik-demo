import 'bootstrap/dist/css/bootstrap.min.css'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'

function App() {
  const [geoState,setGeoState] = useState([])
  const [geoCity,setGeoCity] = useState([])

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      country: "",
      state: "",
      city: "",
      description: ""
    },
    validate : (values) => {
      // If Validate function returns empty object. Then onSubmit will be called. Else onSubmit will not be called
      let error = {}

      if(values.userName == "" || values.userName.length <= 3 || values.userName.length >= 15){
        error.userName = "Please enter a valid User Name"
      }

      if(values.email == "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = "Please enter Email"
      }

      return error
    },
    onSubmit : (values) => {
      console.log(values)
    }
  })

  let geoData = {
    countries : [
      {
        name : "India",
        value : "IN"
      },
      {
        name : "America",
        value : "US"
      }
    ],
    states : [
      {
        name : "Tamil Nadu",
        key : "TN",
        country : "IN"
      },
      {
        name : "Kerla",
        key : "KL",
        country : "IN"
      },
      {
        name : "Alaska",
        key : "AL",
        country : "US"
      },
      {
        name : "Texas",
        key : "TX",
        country : "US"
      }
    ],
    cities : [
      {
        name : "Chennai",
        key : "CH",
        state : "TN"
      },
      {
        name : "Madural",
        key : "MD",
        state : "TN"
      },
      {
        name : "Kochi",
        key : "KO",
        state : "KL"
      },
      {
        name : "Wayanad",
        key : "WD",
        state : "KL"
      },
      {
        name : "Seward",
        key : "SE",
        state : "AL"
      },
      {
        name : "Haines",
        key : "HA",
        state : "AL"
      },
      {
        name : "Houston",
        key : "HO",
        state : "TX"
      },
      {
        name : "Dallas",
        key : "DA",
        state : "TX"
      }
    ]
  }


  useEffect(() => {
    // US
    // Find all the states belongs to Selected Country Code.
    let stateList = geoData.states.filter((state) => {
      return state.country == formik.values.country
    })
    setGeoState(stateList)
  },[formik.values.country])

  useEffect(() => {
    // US
    // Find all the states belongs to Selected Country Code.
    let cityList = geoData.cities.filter((city) => {
      return city.state == formik.values.state
    })
    setGeoCity(cityList)
  },[formik.values.state])


  return (
    <>
      <div className='container'>
        <div className='row'>
          <form onSubmit={formik.handleSubmit}>
            <div className='col-lg-12'>
              <div className='row'>
                <div className='col-lg-6'>
                  <label htmlFor="">Name *</label>
                  <input type="text"
                    name='userName'
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    className={`form-control ${formik.errors.userName && 'is-invalid'}`} />
                    <span style={{color : 'red'}}>{formik.errors.userName}</span>
                </div>
                <div className='col-lg-6'>
                  <label htmlFor="">Email</label>
                  <input type="text"
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={`form-control ${formik.errors.email && 'is-invalid'}`} />
                    <span style={{color : 'red'}}>{formik.errors.email}</span>
                </div>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='row'>
                <div className='col-lg-4'>
                  <label htmlFor="">Country</label>
                  <select id=""
                    name='country'
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    className='form-control'>
                    <option value="IN">India</option>
                    <option value="US">America</option>
                  </select>
                </div>
                <div className='col-lg-4'>
                  <label htmlFor="">State</label>
                  <select
                    name='state'
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    id="" className='form-control'>
                    {
                      geoState.map((state) => {
                        return <option value={state.key}>{state.name}</option>
                      })
                    }
                  </select>
                </div>
                <div className='col-lg-4'>
                  <label htmlFor="">City</label>
                  <select
                    name='city'
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    id="" className='form-control'>
                    {
                      geoCity.map((city) => {
                        return <option key={city.key}>{city.name}</option>
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='row'>
                <div className='col-lg-12'>
                  <label htmlFor="">Description</label>
                  <textarea
                    name='description'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    id="" className='form-control'></textarea>
                </div>
              </div>
            </div>
            <div className='col-lg-12 mt-3'>
              <div className='row'>
                <div className='col-lg-12'>
                  <input type="submit" className='btn btn-primary' />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
