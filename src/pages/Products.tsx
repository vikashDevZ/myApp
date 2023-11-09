import React, { useEffect, useState, FormEvent } from "react";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRadio,
  IonRadioGroup,
  IonCheckbox,
  IonContent,
  IonInput,
  IonPage,
  IonRow,
  IonButtons,
  IonButton,
  IonCol,
} from "@ionic/react";
import "./Products.css";

let loanArr = [
  { sub_product_id: 1, label: "Home Loan", percentage: 0, checked: false },
  {
    sub_product_id: 2,
    label: "Loan Against Property",
    percentage: 0,
    checked: false,
  },
  { sub_product_id: 3, label: "Personal Loan", percentage: 0, checked: false },
  { sub_product_id: 4, label: "Bussiness Loan", percentage: 0, checked: false },
  { sub_product_id: 5, label: "Life Insurance", percentage: 0, checked: false },
  {
    sub_product_id: 6,
    label: "Health Insurance",
    percentage: 0,
    checked: false,
  },
];

const Products = () => {
  const [homeLoanValue, setHomeLoanValue] = useState(0);
  const [loanvalue, setLoanValue] = useState(loanArr);
  const [selectedValue, setSelectedValue] = useState("all");
  const [checkAllBox, setcheckAllBox] = useState(false);
  const [finalLoanValues, setFinalLoanValues] = useState([]);

  const setCurrLoanValue = (id: any, value: number) => {
    let updatedValues = loanvalue.map((item) => {
      if (item.sub_product_id === id) {
        item.percentage = value;
        item.checked = true;
      }
      return item;
    });
    setLoanValue(updatedValues);
  };

  const handleAllCheck = (flag: boolean) => {
    setcheckAllBox(flag);
  };

  const handleRadioChange = (e: CustomEvent) => {
    setSelectedValue(e.detail.value);
  };

  const handleCheckboxChange = (itemId: any, checked: boolean) => {
    let updatedValues = loanvalue.map((item) => {
      if (item.sub_product_id === itemId) {
        item.checked = checked;
      }
      return item;
    });
    setLoanValue(updatedValues);
  };

  const handleSubmit = () => {
    console.log('finalLoanValues', finalLoanValues)
    alert(JSON.stringify(finalLoanValues));
  };

  useEffect(() => {
    if (selectedValue === "all") {
      let newLoan = loanvalue.map((item) => {
        item.percentage = homeLoanValue;
        return item;
      });
      setLoanValue(newLoan);
    }
  }, [selectedValue, homeLoanValue]);

  useEffect(() => {
    if (checkAllBox) {
      let newLoan: any = loanvalue.map((item) => {
        return { item };
      });
      setFinalLoanValues(newLoan);
    } else {
      let newLoan: any = loanvalue.filter((item) => item.checked);
      setFinalLoanValues(newLoan);
    }
  }, [loanvalue, selectedValue, checkAllBox]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Loan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonRadioGroup value={selectedValue} onIonChange={handleRadioChange}>
            <IonRow>
              <IonCol size="2" sizeMd="1">
                <IonRadio aria-label="Custom checkbox" value="all" />
              </IonCol>
              <IonCol className="ion-align-items-center">
                <span>Set flat payout % for all sub-products</span>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="2" sizeMd="1">
                <IonRadio
                  aria-label="Custom checkbox that is checked"
                  value="single"
                />
              </IonCol>
              <IonCol className="ion-align-items-center">
                <span>Set payout % per sub-product</span>
              </IonCol>
            </IonRow>
          </IonRadioGroup>

          <IonRow className="ion-margin-top">
            <IonCol size="5" sizeMd="5">
              <span>Enter Flat Payout</span>
            </IonCol>
            <IonCol size="5" sizeMd="5">
              <IonInput
                disabled={selectedValue == "single"}
                fill="outline"
                type="number"
                value={homeLoanValue}
                onIonChange={(e) => setHomeLoanValue(parseInt(e.detail.value!))}
              />
            </IonCol>
            <IonCol size="1" sizeMd="1">
              <span>%</span>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top">
            <IonCol size="12" sizeMd="12">
              <div style={{ display: "flex", alignItems: "center" }}>
                <IonCheckbox
                  onIonChange={(e) => handleAllCheck(e.detail.checked)}
                />
                <span className="ion-padding-start">Select All</span>
              </div>
            </IonCol>
            {loanvalue.map((item, idx) => {
              return (
                <>
                  <IonCol size="5" sizeMd="5">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IonCheckbox
                        checked={checkAllBox || item.checked}
                        onIonChange={(e) =>
                          handleCheckboxChange(
                            item.sub_product_id,
                            e.detail.checked
                          )
                        }
                      />
                      <span className="ion-padding-start">{item.label}</span>
                    </div>
                  </IonCol>
                  <IonCol size="5" sizeMd="5">
                    <IonInput
                      disabled={selectedValue == "all"}
                      fill="outline"
                      type="number"
                      value={item.percentage}
                      onIonChange={(e) =>
                        setCurrLoanValue(
                          item.sub_product_id,
                          parseFloat(e.detail.value!)
                        )
                      }
                    />
                  </IonCol>
                  <IonCol size="1" sizeMd="1">
                    <span>%</span>
                  </IonCol>
                </>
              );
            })}
          </IonRow>
          <IonRow className="ion-margin-top">
            <button onClick={handleSubmit}>Submit</button>
          </IonRow>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Products;
