import React, { useState, useMemo } from 'react';
import './QuoteFormWithSummary.css';

// Vehicle makes and models data
const vehicleData = {
  'Toyota': ['Corolla', 'Camry', 'RAV4', 'Land Cruiser', 'Hilux', 'Prado', 'Fortuner', 'Hiace'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot', 'Fit'],
  'Nissan': ['X-Trail', 'Qashqai', 'Juke', 'Navara', 'Patrol', 'Note', 'Tiida'],
  'Mazda': ['CX-5', 'CX-3', 'Mazda3', 'Mazda6', 'BT-50'],
  'Subaru': ['Forester', 'Outback', 'XV', 'Impreza', 'Legacy', 'WRX'],
  'Volkswagen': ['Golf', 'Tiguan', 'Polo', 'Passat', 'Touareg'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'G-Class'],
  'BMW': ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X6'],
  'Audi': ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7'],
  'Mitsubishi': ['Outlander', 'ASX', 'Pajero', 'L200', 'Mirage']
};

// Marine cargo data
const seaPorts = {
  'Kenya': ['Port of Mombasa'],
  'Tanzania': ['Port of Dar es Salaam', 'Port of Tanga', 'Port of Zanzibar'],
  'South Africa': ['Port of Durban', 'Port of Cape Town', 'Port of Port Elizabeth'],
  'Egypt': ['Port of Alexandria', 'Port Said', 'Suez Port'],
  'China': ['Port of Shanghai', 'Port of Shenzhen', 'Port of Ningbo-Zhoushan'],
  'Singapore': ['Port of Singapore'],
  'UAE': ['Port of Dubai', 'Port of Abu Dhabi', 'Port of Sharjah'],
  'Netherlands': ['Port of Rotterdam', 'Port of Amsterdam'],
  'USA': ['Port of Los Angeles', 'Port of New York', 'Port of Houston']
};

const airports = {
  'Kenya': ['Jomo Kenyatta International Airport', 'Moi International Airport'],
  'Tanzania': ['Julius Nyerere International Airport', 'Kilimanjaro International Airport'],
  'South Africa': ['OR Tambo International Airport', 'Cape Town International Airport'],
  'Egypt': ['Cairo International Airport', 'Hurghada International Airport'],
  'China': ['Beijing Capital International Airport', 'Shanghai Pudong International Airport'],
  'Singapore': ['Singapore Changi Airport'],
  'UAE': ['Dubai International Airport', 'Abu Dhabi International Airport'],
  'Netherlands': ['Amsterdam Airport Schiphol'],
  'USA': ['John F. Kennedy International Airport', 'Los Angeles International Airport']
};

const goodsCategories = [
  'Agricultural Products',
  'Textiles and Clothing',
  'Electronics and Electrical Equipment',
  'Machinery and Equipment',
  'Chemicals and Pharmaceuticals',
  'Metals and Minerals',
  'Food and Beverages',
  'Construction Materials',
  'Automotive Parts',
  'Consumer Goods',
  'Cotton and Fabrics',
  'Paper and Wood Products',
  'Plastics and Rubber',
  'Furniture and Home Goods'
];

export default function QuoteFormWithSummary({ product, onBack }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    spouse: 'No',
    spouseDob: '',
    hasChildren: 'No',
    numberOfChildren: '',
    // Golfers insurance fields
    golfClubs: '',
    occupation: '',
    policyStartDate: '',
    // Student accident fields
    studentOccupation: '',
    placeOfAttachment: '',
    natureOfAttachment: '',
    durationOfAttachment: '',
    // Motor insurance fields
    vehicleMake: '',
    vehicleModel: '',
    manufactureYear: '',
    vehicleValue: '',
    vehicleBodyType: '',
    vehicleTonnage: '',
    vehicleUseComprehensive: '',
    viewTpoQuotations: 'No',
    vehicleUseTpo: '',
    // Marine cargo fields
    goodsValue: '',
    modeOfConveyance: '',
    goodsCategory: '',
    originCountry: '',
    originPort: '',
    destinationCountry: '',
    destinationPort: ''
  });
  const [showReceipt, setShowReceipt] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => {
      const newForm = { ...prev, [name]: value };
      // Reset vehicle model when make changes
      if (name === 'vehicleMake') {
        newForm.vehicleModel = '';
      }
      // Reset dependent fields when mode of conveyance changes
      if (name === 'modeOfConveyance') {
        newForm.originCountry = '';
        newForm.originPort = '';
        newForm.destinationCountry = '';
        newForm.destinationPort = '';
      }
      // Reset ports when countries change
      if (name === 'originCountry') {
        newForm.originPort = '';
      }
      if (name === 'destinationCountry') {
        newForm.destinationPort = '';
      }
      return newForm;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowReceipt(true);
  };

  const isCICFamily = product.type === 'family';
  const isMotorInsurance = product.type === 'motor';
  const isFamilyMedisure = product.id === 'family-medisure';
  const isGolfersInsurance = product.id === 'golfers-insurance';
  const isStudentAccident = product.id === 'student-accident';
  const isMotorPrivate = product.id === 'motor-private';
  const isMarineCargo = product.id === 'marine-cargo';

  // Get current date for validation
  const currentYear = new Date().getFullYear();
  const today = new Date().toISOString().split('T')[0];

  // Get available models for selected make
  const availableModels = useMemo(() => {
    return form.vehicleMake ? vehicleData[form.vehicleMake] || [] : [];
  }, [form.vehicleMake]);

  // Get available ports/airports based on selected countries and mode
  const availableOriginPorts = useMemo(() => {
    if (!form.originCountry || !form.modeOfConveyance) return [];
    return form.modeOfConveyance === 'sea' 
      ? seaPorts[form.originCountry] || []
      : airports[form.originCountry] || [];
  }, [form.originCountry, form.modeOfConveyance]);

  const availableDestinationPorts = useMemo(() => {
    if (!form.destinationCountry || !form.modeOfConveyance) return [];
    return form.modeOfConveyance === 'sea'
      ? seaPorts[form.destinationCountry] || []
      : airports[form.destinationCountry] || [];
  }, [form.destinationCountry, form.modeOfConveyance]);

  const availableCountries = useMemo(() => {
    if (!form.modeOfConveyance) return [];
    return form.modeOfConveyance === 'sea'
      ? Object.keys(seaPorts)
      : Object.keys(airports);
  }, [form.modeOfConveyance]);

  if (showReceipt) {
    return (
      <div className="quote-receipt">
        <div className="quote-receipt-content">
          <div className="quote-receipt-header">
            <img src="/cic-logo.jpeg" alt="CIC GROUP" className="quote-receipt-logo" />
            <h2>Quote Summary</h2>
          </div>  
          
          <div className="quote-receipt-product">
            <img src={product.img} alt={product.title} className="quote-receipt-product-img" />
            <div className="quote-receipt-product-details">
              <h3>{product.title}</h3>
              <p>{product.desc}</p>
            </div>
          </div>

          <div className="quote-receipt-details">
            <h4>Personal Information</h4>
            <div className="quote-receipt-grid">
              <div className="quote-receipt-item">
                <label>Name</label>
                <span>{form.name}</span>
              </div>
              <div className="quote-receipt-item">
                <label>Phone Number</label>
                <span>{form.phone}</span>
              </div>
              <div className="quote-receipt-item">
                <label>Email</label>
                <span>{form.email}</span>
              </div>

              {isMotorPrivate && (
                <>
                  <div className="quote-receipt-item">
                    <label>Vehicle Make</label>
                    <span>{form.vehicleMake}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Vehicle Model</label>
                    <span>{form.vehicleModel}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Year of Manufacture</label>
                    <span>{form.manufactureYear}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Vehicle Value</label>
                    <span>KES {form.vehicleValue}</span>
                  </div>
                </>
              )}

              {isStudentAccident && (
                <>
                  <div className="quote-receipt-item">
                    <label>Occupation</label>
                    <span>{form.studentOccupation}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Place of Attachment</label>
                    <span>{form.placeOfAttachment}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Nature of Attachment</label>
                    <span>{form.natureOfAttachment}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Duration of Attachment</label>
                    <span>{form.durationOfAttachment}</span>
                  </div>
                </>
              )}

              {isGolfersInsurance && (
                <>
                  <div className="quote-receipt-item">
                    <label>Golf Clubs Membership</label>
                    <span>{form.golfClubs}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Occupation</label>
                    <span>{form.occupation}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Policy Start Date</label>
                    <span>{form.policyStartDate}</span>
                  </div>
                </>
              )}

              {isCICFamily && !isGolfersInsurance && (
                <>
                  <div className="quote-receipt-item">
                    <label>Date of Birth</label>
                    <span>{form.dob}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Include Spouse</label>
                    <span>{form.spouse}</span>
                  </div>
                  {form.spouse === 'Yes' && (
                    <div className="quote-receipt-item">
                      <label>Spouse Date of Birth</label>
                      <span>{form.spouseDob}</span>
                    </div>
                  )}
                  {isFamilyMedisure && (
                    <>
                      <div className="quote-receipt-item">
                        <label>Do you have children?</label>
                        <span>{form.hasChildren}</span>
                      </div>
                      {form.hasChildren === 'Yes' && (
                        <div className="quote-receipt-item">
                          <label>Number of Children</label>
                          <span>{form.numberOfChildren}</span>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
              {isMotorInsurance && (
                <>
                  <div className="quote-receipt-item">
                    <label>Vehicle Body Type</label>
                    <span>{form.vehicleBodyType}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Vehicle Tonnage</label>
                    <span>{form.vehicleTonnage}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Vehicle Use (Comprehensive)</label>
                    <span>{form.vehicleUseComprehensive}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>View TPO Quotations</label>
                    <span>{form.viewTpoQuotations}</span>
                  </div>
                  {form.viewTpoQuotations === 'Yes' && (
                    <div className="quote-receipt-item">
                      <label>Vehicle Use (TPO)</label>
                      <span>{form.vehicleUseTpo}</span>
                    </div>
                  )}
                </>
              )}
              {isMarineCargo && (
                <>
                  <div className="quote-receipt-item">
                    <label>Value of Goods</label>
                    <span>KES {form.goodsValue}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Mode of Conveyance</label>
                    <span>{form.modeOfConveyance === 'sea' ? 'Sea' : 'Air'}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Category of Goods</label>
                    <span>{form.goodsCategory}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Country of Origin</label>
                    <span>{form.originCountry}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>{form.modeOfConveyance === 'sea' ? 'Port' : 'Airport'} of Origin</label>
                    <span>{form.originPort}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>Country of Destination</label>
                    <span>{form.destinationCountry}</span>
                  </div>
                  <div className="quote-receipt-item">
                    <label>{form.modeOfConveyance === 'sea' ? 'Port' : 'Airport'} of Destination</label>
                    <span>{form.destinationPort}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="quote-receipt-actions">
            <button onClick={() => setShowReceipt(false)} className="quote-receipt-edit">
              Edit Details
            </button>
            <button className="quote-receipt-proceed">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-form-section">
      <button className="quote-form-back" onClick={onBack}>&larr; Back</button>
      
      <div className="quote-form-layout">
        <div className="quote-form-main">
          <h2 className="quote-form-title">Get Your Quote Now</h2>
          
          <form onSubmit={handleSubmit} className="quote-form">
            <div className="form-group">
              <label>
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>

            {isMotorPrivate && (
              <>
                <div className="form-group">
                  <label>
                    Vehicle Make <span className="required">*</span>
                  </label>
                  <select
                    name="vehicleMake"
                    value={form.vehicleMake}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select vehicle make</option>
                    {Object.keys(vehicleData).map(make => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Vehicle Model <span className="required">*</span>
                  </label>
                  <select
                    name="vehicleModel"
                    value={form.vehicleModel}
                    onChange={handleChange}
                    required
                    disabled={!form.vehicleMake}
                  >
                    <option value="">Select vehicle model</option>
                    {availableModels.map(model => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Year of Manufacture <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="manufactureYear"
                    value={form.manufactureYear}
                    onChange={handleChange}
                    placeholder="Enter year of manufacture"
                    min="1900"
                    max={currentYear}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Vehicle Value (KES) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="vehicleValue"
                    value={form.vehicleValue}
                    onChange={handleChange}
                    placeholder="KES"
                    min="0"
                    required
                  />
                </div>
              </>
            )}

            {isStudentAccident && (
              <>
                <div className="form-group">
                  <label>
                    Occupation <span className="required">*</span>
                  </label>
                  <select
                    name="studentOccupation"
                    value={form.studentOccupation}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your occupation</option>
                    <option value="intern">Intern</option>
                    <option value="security">Security Service</option>
                    <option value="rider">Rider</option>
                    <option value="driver">Driver</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Place of Attachment <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="placeOfAttachment"
                    value={form.placeOfAttachment}
                    onChange={handleChange}
                    placeholder="Enter your place of attachment"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Nature of Attachment <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="natureOfAttachment"
                    value={form.natureOfAttachment}
                    onChange={handleChange}
                    placeholder="Enter nature of attachment"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Duration of Attachment <span className="required">*</span>
                  </label>
                  <select
                    name="durationOfAttachment"
                    value={form.durationOfAttachment}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select duration</option>
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                  </select>
                </div>
              </>
            )}

            {isGolfersInsurance && (
              <>
                <div className="form-group">
                  <label>
                    Which clubs are you a member of? <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="golfClubs"
                    value={form.golfClubs}
                    onChange={handleChange}
                    placeholder="Enter golf club memberships"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Occupation <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={form.occupation}
                    onChange={handleChange}
                    placeholder="Enter your occupation"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Policy Start Date <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    name="policyStartDate"
                    value={form.policyStartDate}
                    onChange={handleChange}
                    min={today}
                    required
                  />
                </div>
              </>
            )}

            {isCICFamily && !isGolfersInsurance && (
              <>
                <div className="form-group">
                  <label>
                    What is your Date of Birth? <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Do you have and want to insure your spouse? <span className="required">*</span>
                  </label>
                  <select
                    name="spouse"
                    value={form.spouse}
                    onChange={handleChange}
                    required
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {form.spouse === 'Yes' && (
                  <div className="form-group">
                    <label>
                      Spouse's Date of Birth <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      name="spouseDob"
                      value={form.spouseDob}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}

                {isFamilyMedisure && (
                  <>
                    <div className="form-group">
                      <label>
                        Do you have children? <span className="required">*</span>
                      </label>
                      <select
                        name="hasChildren"
                        value={form.hasChildren}
                        onChange={handleChange}
                        required
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>

                    {form.hasChildren === 'Yes' && (
                      <div className="form-group">
                        <label>
                          How many children do you have? <span className="required">*</span>
                        </label>
                        <input
                          type="number"
                          name="numberOfChildren"
                          value={form.numberOfChildren}
                          onChange={handleChange}
                          placeholder="Enter number of children"
                          min="1"
                          max="10"
                          required
                        />
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {isMotorInsurance && (
              <>
                <div className="form-group">
                  <label>
                    Vehicle Body Type <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="vehicleBodyType"
                    value={form.vehicleBodyType}
                    onChange={handleChange}
                    placeholder="Enter vehicle body type"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Vehicle Tonnage <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="vehicleTonnage"
                    value={form.vehicleTonnage}
                    onChange={handleChange}
                    placeholder="Enter vehicle tonnage"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Vehicle Use (Comprehensive) <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="vehicleUseComprehensive"
                    value={form.vehicleUseComprehensive}
                    onChange={handleChange}
                    placeholder="Enter vehicle use for comprehensive"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Do you want to view TPO quotations? <span className="required">*</span>
                  </label>
                  <select
                    name="viewTpoQuotations"
                    value={form.viewTpoQuotations}
                    onChange={handleChange}
                    required
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {form.viewTpoQuotations === 'Yes' && (
                  <div className="form-group">
                    <label>
                      Vehicle Use (TPO) <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="vehicleUseTpo"
                      value={form.vehicleUseTpo}
                      onChange={handleChange}
                      placeholder="Enter vehicle use for TPO"
                      required
                    />
                  </div>
                )}
              </>
            )}

            {isMarineCargo && (
              <>
                <div className="form-group">
                  <label>
                    Value of Goods (KES) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="goodsValue"
                    value={form.goodsValue}
                    onChange={handleChange}
                    placeholder="KES"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Mode of Conveyance <span className="required">*</span>
                  </label>
                  <select
                    name="modeOfConveyance"
                    value={form.modeOfConveyance}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select mode of conveyance</option>
                    <option value="sea">Sea</option>
                    <option value="air">Air</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Category of Goods <span className="required">*</span>
                  </label>
                  <select
                    name="goodsCategory"
                    value={form.goodsCategory}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category of goods</option>
                    {goodsCategories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {form.modeOfConveyance && (
                  <>
                    <div className="form-group">
                      <label>
                        Country of Origin <span className="required">*</span>
                      </label>
                      <select
                        name="originCountry"
                        value={form.originCountry}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select country of origin</option>
                        {availableCountries.map(country => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                    {form.originCountry && (
                      <div className="form-group">
                        <label>
                          {form.modeOfConveyance === 'sea' ? 'Port' : 'Airport'} of Origin <span className="required">*</span>
                        </label>
                        <select
                          name="originPort"
                          value={form.originPort}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select {form.modeOfConveyance === 'sea' ? 'port' : 'airport'} of origin</option>
                          {availableOriginPorts.map(port => (
                            <option key={port} value={port}>
                              {port}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="form-group">
                      <label>
                        Country of Destination <span className="required">*</span>
                      </label>
                      <select
                        name="destinationCountry"
                        value={form.destinationCountry}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select country of destination</option>
                        {availableCountries.map(country => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                    {form.destinationCountry && (
                      <div className="form-group">
                        <label>
                          {form.modeOfConveyance === 'sea' ? 'Port' : 'Airport'} of Destination <span className="required">*</span>
                        </label>
                        <select
                          name="destinationPort"
                          value={form.destinationPort}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select {form.modeOfConveyance === 'sea' ? 'port' : 'airport'} of destination</option>
                          {availableDestinationPorts.map(port => (
                            <option key={port} value={port}>
                              {port}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            <button type="submit" className="quote-form-submit">
              Display Quotes
            </button>
          </form>
        </div>

        <div className="quote-form-summary">
          <div className="quote-summary-card">
            <h3>Quoting For</h3>
            <div className="quote-summary-product">
              <img src={product.img} alt={product.title} className="quote-summary-img" />
              <h4>{product.title}</h4>
            </div>
            <div className="quote-summary-desc">
              <h5>Product Description</h5>
              <p>{product.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 