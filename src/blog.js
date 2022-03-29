/*
  Author: Sebastian Duque Rivera (A00441528) or SDR
  Author: Felipe Duque Rivera (A00446745) or FDR
  Author: Mohammed Al-Bashiri (A00391502)
  Author: Colby O'Keefe (A00428974)

  This file will be used throughout our project for the three phases of our service learning
  assignment for Northwood Care. This is our javascript file.
    
  Current Phase: 1 , Date created: March 3, 2022.
*/

// Server URL
const SERVER_URL = "http://127.0.0.1:3033";
//const SERVER_URL = "http://ugdev.cs.smu.ca:3033";

// Stores last blog ID selected
let currentBlogID = null;
// Stores keybaord element
let keyboard = null;
// Stores blog element
let blog = null;
// Stores the three edit swicth elements
let edit1 = null;
let edit2 = null;
let edit3 = null;
// Stores the three blog title elements
let title1 = null;
let title2 = null;
let title3 = null;

let checkedContainer = null;

/*
  Sets up the keyboard and blog list to be hidden.

  Author(s): Colby O'Keefe(A00428974) + SDR
*/
function setup() {
  // Gets page elements
  keyboard = $("#kbd").get(0);
  blog = $("#blogArea").get(0);
  edit1 = $("#edit1").get(0);
  edit2 = $("#edit2").get(0);
  edit3 = $("#edit3").get(0);
  title1 = $("#title1").get(0);
  title2 = $("#title2").get(0);
  title3 = $("#title3").get(0);
  checkedContainer = $("#blog-option-container").get(0);

  $.get(SERVER_URL + "/getBlog", { blogIndex: 1 }).done(req => {$("#publish1").prop("checked", req.published);});
  $.get(SERVER_URL + "/getBlog", { blogIndex: 2 }).done(req => {$("#publish2").prop("checked", req.published);});
  $.get(SERVER_URL + "/getBlog", { blogIndex: 3 }).done(req => {$("#publish3").prop("checked", req.published);});

  // hides the blog + keyboard
  blog.style.visibility = keyboard.style.visibility = "hidden";

  $("#edit1").change(() => {
    // Check if switch is checked
    if (!$("#edit1").is(":checked")) {
      // disables the keyboard on the title textfield
      $("#title1").addClass("keyboard-disable");
      return;
    }

    // enables the keyboard on the title textfield
    $("#title1").removeClass("keyboard-disable");

    // Sets selected blog id
    currentBlogID = "blog1";

    // Gets saved value from local storage if its supported by the browser
    $.get(SERVER_URL + "/getBlog", { blogIndex: 1 }).done(setBlog);

    // focus the blog textarea so the keyboard will update
    $("#textbox").focus((e) => {
      e.target.focus({ preventScroll: true });
    });
  });

  $("#edit2").change(() => {
    // Check if switch is checked
    if (!$("#edit2").is(":checked")) {
      // disables the keyboard on the title textfield
      $("#title2").addClass("keyboard-disable");
      return;
    }

    // enables the keyboard on the title textfield
    $("#title2").removeClass("keyboard-disable");

    // Gets saved value from local storage if its supported by the browser
    currentBlogID = "blog2";
    $.get(SERVER_URL + "/getBlog", { blogIndex: 2 }).done(setBlog);

    // focus the blog textarea so the keybaord will update
    $("#textbox").focus();
  });

  $("#edit3").change(() => {
    // Check if switch is checked
    if (!$("#edit3").is(":checked")) {
      // disables the keyboard on the title textfield
      $("#title3").addClass("keyboard-disable");
      return;
    }

    // enables the keyboard on the title textfield
    $("#title3").removeClass("keyboard-disable");

    // Sets selected blog id
    currentBlogID = "blog3";

    // Gets saved value from local storage if its supported by the browser
    $.get(SERVER_URL + "/getBlog", { blogIndex: 3 }).done(setBlog);

    // focus the blog textarea so the keybaord will update
    $("#textbox").focus();
  });

  $("#publish1").change(() => {
    const packet = {
      blogIndex: 1,
      published: $("#publish1").is(":checked")
    }
    $.post(SERVER_URL + "/publishBlog", packet)
  });

  $("#publish2").change(() => {
    const packet = {
      blogIndex: 2,
      published: $("#publish2").is(":checked")
    }
    $.post(SERVER_URL + "/publishBlog", packet)
  });

  $("#publish3").change(() => {
    const packet = {
      blogIndex: 3,
      published: $("#publish3").is(":checked")
    }
    $.post(SERVER_URL + "/publishBlog", packet)
  });
}

/**
 * This function checks to see if any of the edit toggles are checked. If they are, this function
 * will retrieve the keyboard, as well as the blog area.
 *
 * Created: SDR March 5, 2022
 * Modified: SDR March 12, 2022
 */
function getKbd() {
  let isBlogVisable = edit1.checked || edit2.checked || edit3.checked;
  let allBlogsUnchecked = !edit1.checked && !edit2.checked && !edit3.checked;

  blog.style.visibility = keyboard.style.visibility = isBlogVisable
    ? "visible"
    : "hidden";

  checkedContainer.style.display = allBlogsUnchecked ? "block" : "none";
}

function setBlog(req) {
  console.log(req);
  $("#textbox").val(req.content);
  // Updates keybaord
  $("#textbox").focus();
}

/**
 * This function saves whatever is in the textbox to local storage.
 *
 * SDR March 6, 2022 + Colby O'Keefe (A00428974)
 * Created: Mohammed Al-Bashiri March 25, 2022
 * Modified: Colby O'Keefe(A00428974)
 */
function save() {
  swal({
    title: "Are you sure you want to save?",
    text: "Once you save, you will not be able to go back!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willSave) => {
    if (!willSave) {
      swal("No changes were saved.");
      return;
    }
      swal("ARE YOU SURE?!", {
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((confirmSave) => {
        if (!confirmSave) {
          swal("No changes were saved.");
          return;
        }
        const packet = {
          blogIndex: parseInt(currentBlogID.replace(/blog/i, "")),
          blogContent: $("#textbox").val()
        };
        $.post(SERVER_URL + "/saveBlog", packet);
      });
  });
}

/*
  Cancels the current blog edit
  Created: Mohammed Al-Bashiri March 25, 2022
  Modified: Colby O'Keefe(A00428974)
  Modified: March 28, 2022 (SDR + FDR)
*/
function cancel(req) {
  swal({
    title: "Are you sure you want to cancel?",
    text: "Once you cancel, you will not be able to go back!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willCancel) => {
    if (!willCancel) {
      swal("No changes were made.");
      return;
    }
      swal("ARE YOU SURE?!", {
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((confirmCancel) => {
        if (!confirmCancel) {
          swal("No changes were made.");
          return;
        }
        edit1.checked = edit2.checked = edit3.checked = false;
        getKbd();
      });
  });
}

/*
  Creates the clear button that erases the latest word in the current blog edit.

  Author(s): Felipe Duque Rivera (A00446745)
  Modfified: March 26, 2022 Colby & Mohammed
*/
function erase() {
  let text = $("#textbox").val();
  let lastindex = text.lastIndexOf(" ");
  if (lastindex === -1) $("#textbox").val("");
  else $("#textbox").val(text.substring(0, lastindex));
  $("#textbox").focus();
}
