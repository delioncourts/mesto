export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("mousedown", closePopupOverlay); 
    document.addEventListener("keydown", closePopupEsc);
    }

export function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("mousedown", closePopupOverlay); 
    document.removeEventListener("keydown", closePopupEsc);
    }
    
//закрытие по оверлею
export function closePopupOverlay(evt) {
        if (evt.target.classList.contains("popup")){
          closePopup(document.querySelector(".popup_opened"));
        }
      }
      
//закрытие по Esc
export function closePopupEsc(evt) {
        if (evt.key === "Escape")
        closePopup(document.querySelector(".popup_opened"));
      }