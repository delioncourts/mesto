export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("mousedown", closePopupOverlay); 
    document.addEventListener("keydown", closePopupEsc);
    buttonSave.setAttribute("disabled", true);
    buttonSave.classList.add("popup__save_disabled");
    }

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