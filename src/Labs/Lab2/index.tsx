import { Container } from "react-bootstrap";
import "./index.css";
import ReactIconsSampler from "./ReactIcons.tsx"
import BootstrapGrids from "./BootstrapGrids.tsx";
import ScreenSizeLabel from "./ScreenSizeLabel.tsx";
import BootstrapTables from "./BootstrapTables.tsx";
import BootstrapLists from "./BootstrapLists.tsx";
import BootstrapForms from "./BootstrapForms.tsx";
import BootstrapNavigation from "./BootstrapNavigation.tsx";

export default function Lab2() {
  return (
    <Container id="wd-lab2">
      <h2>Lab 2 - Cascading Style Sheets</h2>

      {/* Style Attribute */}
      <h3>Styling with the STYLE attribute</h3>
      <p>
        Style attribute allows configuring look and feel right on the element.
        Although it's very convenient it is considered bad practice and you
        should avoid using the style attribute
      </p>

      {/* ID Selectors */}
      <div id="wd-css-id-selectors">
        <h3>ID selectors</h3>
        <p id="wd-id-selector-1">
          Instead of changing the look and feel of all the elements of the same
          name, e.g., P, we can refer to a specific element by its ID
        </p>
        <p id="wd-id-selector-2">
          Here's another paragraph using a different ID and a different look and
          feel
        </p>
      </div>

      {/* Class Selectors */}
      <div id="wd-css-class-selectors">
        <h3>Class selectors</h3>

        <p className="wd-class-selector">
          Instead of using IDs to refer to elements, you can use an element's
          CLASS attribute
        </p>

        <h4 className="wd-class-selector">
          This heading has same style as paragraph above
        </h4>
      </div>

      {/* Document Structure */}
      <div id="wd-css-document-structure">
        <div className="wd-selector-1">
          <h3>Document structure selectors</h3>
          <div className="wd-selector-2">
            Selectors can be combined to refer elements in particular places in
            the document
            <p className="wd-selector-3">
              This paragraph's red background is referenced as
              <br />
              .selector-2 .selector3
              <br />
              meaning the descendant of some ancestor.
              <br />
              <span className="wd-selector-4">
                Whereas this span is a direct child of its parent
              </span>
              <br />
              You can combine these relationships to create specific styles
              depending on the document structure
            </p>
          </div>
        </div>
      </div>

      {/* CSS Colors */}
      <div id="wd-css-colors">
        <h2>Colors</h2>
        <h3 className="wd-fg-color-blue">Foreground color</h3>
        <p className="wd-fg-color-red">
          The text in this paragraph is red but
          <span className="wd-fg-color-green">{" this text is green"}</span>
        </p>
      </div>

      {/* CSS Background Colors */}
      <div id="wd-css-background-colors">
        <h3 className="wd-bg-color-blue wd-fg-color-white">Background color</h3>
        <p className="wd-bg-color-red wd-fg-color-black">
          This background of this paragraph is red but{" "}
          <span className="wd-bg-color-green wd-fg-color-white">
            the background of this text is green and the foreground white
          </span>
        </p>
      </div>

      {/* CSS Borders */}
      <div id="wd-css-borders">
        <h2>Borders</h2>
        <p className="wd-border-fat wd-border-red wd-border-solid">
          Solid fat red border
        </p>
        <p className="wd-border-thin wd-border-blue wd-border-dashed">
          Dashed thin blue border
        </p>
      </div>

      {/* CSS Paddings */}
      <div id="wd-css-paddings">
        <h2>Padding</h2>
        <div
          className="wd-padded-top-left wd-border-fat 
      wd-border-red wd-border-solid 
      wd-bg-color-yellow"
        >
          Padded top left
        </div>
        <div
          className="wd-padded-bottom-right wd-border-fat 
      wd-border-blue wd-border-solid 
      wd-bg-color-yellow"
        >
          Padded bottom right
        </div>
        <div
          className="wd-padding-fat wd-border-fat 
      wd-border-yellow wd-border-solid 
      wd-bg-color-blue wd-fg-color-white"
        >
          Padded all around{" "}
        </div>
      </div>

      {/* CSS Margins */}
      <div id="wd-css-margins">
        <h2>Margins</h2>
        <div
          className="wd-margin-bottom 
      wd-padded-top-left 
      wd-border-fat wd-border-red 
      wd-border-solid 
      wd-bg-color-yellow"
        >
          Margin bottom
        </div>
        <div
          className="wd-margin-right-left 
      wd-padded-bottom-right 
      wd-border-fat wd-border-blue 
      wd-border-solid 
      wd-bg-color-yellow"
        >
          Margin left right
        </div>
        <div
          className="wd-margin-all-around 
      wd-padding-fat wd-border-fat 
      wd-border-yellow 
      wd-border-solid 
      wd-bg-color-blue 
      wd-fg-color-white"
        >
          Margin all around
        </div>
      </div>

      {/* CSS Borders */}
      <div id="wd-css-borders">
        <h3>Rounded corners</h3>
        <p
          className="wd-rounded-corners-top wd-border-thin 
     wd-border-blue wd-border-solid wd-padding-fat"
        >
          Rounded corners on the top
        </p>
        <p
          className="wd-rounded-corners-bottom 
     wd-border-thin wd-border-blue wd-border-solid 
     wd-padding-fat"
        >
          Rounded corners at the bottom
        </p>
        <p
          className="wd-rounded-corners-all-around 
     wd-border-thin wd-border-blue wd-border-solid 
     wd-padding-fat"
        >
          Rounded corners all around
        </p>
        <p
          className="wd-rounded-corners-inline 
     wd-border-thin wd-border-blue wd-border-solid 
     wd-padding-fat"
        >
          Different rounded corners
        </p>
      </div>

      {/* CSS Dimensions */}
      <div id="wd-css-dimensions">
        <h2>Dimension</h2>
        <div>
          <div className="wd-dimension-portrait wd-bg-color-yellow">
            Portrait
          </div>
          <div
            className="wd-dimension-landscape wd-bg-color-blue
                    wd-fg-color-white"
          >
            Landscape
          </div>
          <div className="wd-dimension-square wd-bg-color-red">Square</div>
        </div>
      </div>

      <div id="wd-css-position-relative">
        <h2>Relative</h2>
        <div className="wd-bg-color-gray">
          <div
            className="wd-bg-color-yellow 
                    wd-dimension-portrait"
          >
            <div className="wd-pos-relative-nudge-down-right">Portrait</div>
          </div>
          <div
            className="wd-pos-relative-nudge-up-right 
        wd-bg-color-blue wd-fg-color-white 
        wd-dimension-landscape"
          >
            Landscape
          </div>
          <div className="wd-bg-color-red wd-dimension-square">Square</div>
        </div>
      </div>

      <div id="wd-css-position-absolute">
        <h2>Absolute position</h2>
        <div className="wd-pos-relative">
          <div
            className="wd-pos-absolute-10-10 
         wd-bg-color-yellow wd-dimension-portrait"
          >
            Portrait
          </div>
          <div
            className="wd-pos-absolute-50-50 
         wd-bg-color-blue wd-fg-color-white 
         wd-dimension-landscape"
          >
            Landscape
          </div>
          <div
            className="wd-pos-absolute-120-20 
         wd-bg-color-red wd-dimension-square"
          >
            Square
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>

      <div id="wd-css-position-fixed">
        <h2>Fixed position</h2>
        Checkout the blue square that says "Fixed position" stuck all the way on
        the right and half way down the page. It doesn't scroll with the rest of
        the page. Its position is "Fixed".
        <div
          className="wd-pos-fixed 
    wd-dimension-square wd-bg-color-blue 
    wd-fg-color-white"
        >
          Fixed position
        </div>
      </div>

      <div id="wd-z-index">
        <h2>Z index</h2>
        <div className="wd-pos-relative">
          <div
            className="wd-pos-absolute-10-10 
         wd-bg-color-yellow wd-dimension-portrait"
          >
            Portrait
          </div>
          <div
            className="wd-zindex-bring-to-front 
         wd-pos-absolute-50-50 wd-dimension-landscape
         wd-bg-color-blue wd-fg-color-white"
          >
            Landscape
          </div>
          <div
            className="wd-pos-absolute-120-20 
         wd-bg-color-red wd-dimension-square"
          >
            Square
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>

      <div id="wd-float-divs">
        <h2>Float</h2>
        <div>
          <img
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          convallis nulla eu odio vulputate, vel sagittis risus molestie.
          Vestibulum consequat massa quis fringilla tincidunt. Mauris semper
          mollis nulla, nec placerat justo pulvinar sed. Duis ornare sed tortor
          at lobortis. Nunc scelerisque magna quis tellus scelerisque, sed
          sodales nisi maximus. Pellentesque quam enim, convallis ac dictum ut,
          egestas quis felis. Quisque euismod tempus massa sed ullamcorper.
          Proin lacinia convallis lobortis. Maecenas quis mollis lectus.
          Suspendisse ultrices ante libero, id faucibus ligula euismod ac. Nulla
          faucibus porttitor est, et imperdiet nisl maximus eget. In ac placerat
          diam. Proin id feugiat nulla. Vestibulum venenatis odio ac eros semper
          gravida. Nulla facilisi. Sed auctor nibh quis cursus maximus.
          Vestibulum convallis pretium turpis eget porta. Curabitur vitae
          tincidunt elit.
          <img
            className="wd-float-left"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          />
          Donec vulputate egestas nisi, eu commodo erat maximus ut. Donec
          lobortis auctor lacus, a efficitur odio tristique sed. Phasellus
          eleifend felis id mauris rutrum, ultrices pharetra justo feugiat. Cras
          eu massa a ante finibus eleifend. Quisque nunc ipsum, condimentum nec
          arcu eu, maximus porttitor quam. Aenean scelerisque sapien quis luctus
          finibus. Integer nisi libero, varius at elit vel, bibendum molestie
          leo. Integer in mauris id ligula tempus tristique. Vivamus quis
          tincidunt lacus. Fusce posuere tempor urna, eu dapibus sapien gravida
          vel. Donec nec nibh at nisi rhoncus tincidunt. Pellentesque varius
          venenatis pulvinar.
          <img
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          />
          Duis sit amet accumsan metus, et sagittis leo. Vestibulum tempus erat
          id pellentesque eleifend. Sed cursus orci nec urna pharetra, at
          interdum leo ultricies. Donec vel ultricies odio. Aliquam erat
          volutpat. Sed venenatis, dui eget feugiat commodo, enim massa congue
          nibh, at ornare tellus est eu lacus. Sed molestie mi nunc, vitae
          cursus neque laoreet vel. Ut ante eros, maximus id tellus vitae,
          elementum mollis sem. Morbi at elementum risus, in porttitor neque.
          Fusce accumsan, sem ac rutrum laoreet, tellus enim bibendum sapien, id
          interdum velit odio quis velit. Nullam efficitur cursus suscipit. Nunc
          eget hendrerit odio. Sed bibendum quis ipsum ut pharetra.
          <img
            className="wd-float-left"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          />
          Sed sodales dictum risus, nec gravida sem accumsan eu. Sed id ex eget
          urna auctor varius sit amet et neque. Curabitur ut massa urna. Morbi
          eleifend maximus augue quis ultrices. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Nullam ac
          velit vulputate dui pellentesque viverra. Fusce tempus massa in
          commodo ultrices. Mauris sed urna vel ipsum maximus mattis sit amet
          sed ex. Donec in justo a sem egestas vehicula a sed dolor. Suspendisse
          finibus, odio vitae pharetra vehicula, ante neque vestibulum dui, vel
          lobortis ipsum purus accumsan nulla. Sed ac ante nec diam ultricies
          ullamcorper vel eu risus. Maecenas fermentum pulvinar augue eget
          ornare. Vivamus fermentum risus efficitur rutrum ornare. Pellentesque
          eget urna ex. Nam in ex risus.
          <div className="wd-float-done"></div>
        </div>
      </div>

      <div id="wd-float-divs">
        <h2>Float</h2>
        <div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
            Yellow{" "}
          </div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
            Blue{" "}
          </div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
            Red{" "}
          </div>
          <img
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          />
          <div className="wd-float-done"></div>
        </div>
      </div>

      <div id="wd-css-grid-layout">
        <div id="wd-css-left-right-layout">
          <h2>Grid layout</h2>
          <div className="wd-grid-row">
            <div className="wd-grid-col-half-page wd-bg-color-yellow">
              <h3>Left half</h3>{" "}
            </div>
            <div className="wd-grid-col-half-page wd-bg-color-blue wd-fg-color-white">
              <h3>Right half</h3>{" "}
            </div>
          </div>
        </div>
        <div id="wd-css-left-third-right-two-thirds" className="wd-grid-row">
          <div
            className="wd-grid-col-third-page wd-bg-color-green
        wd-fg-color-white"
          >
            <h3>Left third</h3>{" "}
          </div>
          <div className="wd-grid-col-two-thirds-page wd-bg-color-red wd-fg-color-white">
            <h3>Right two thirds</h3>{" "}
          </div>
        </div>
        <div id="wd-css-side-bars" className="wd-grid-row">
          <div className="wd-grid-col-left-sidebar wd-bg-color-yellow">
            <h3>Side bar</h3>
            <p>This is the left sidebar</p>{" "}
          </div>
          <div className="wd-grid-col-main-content wd-bg-color-blue wd-fg-color-white">
            <h3>Main content</h3>
            <p>
              This is the main content. This is the main content. This is the
              main content.
            </p>{" "}
          </div>

          <div className="wd-grid-col-right-sidebar wd-bg-color-green wd-fg-color-white">
            <h3>Side bar</h3>
            <p>This is the right sidebar</p>
          </div>
        </div>
      </div>

      <br />

      <div id="wd-css-flex">
        <h2>Flex</h2>
        <div className="wd-flex-row-container">
          <div
            className="wd-bg-color-yellow 
                    wd-width-75px"
          >
            Column 1
          </div>
          <div className="wd-bg-color-blue">Column 2</div>
          <div
            className="wd-bg-color-red
                    wd-flex-grow-1"
          >
            Column 3
          </div>
        </div>
      </div>

      <ReactIconsSampler />
      <BootstrapGrids />
      <ScreenSizeLabel />
      <BootstrapTables />
      <BootstrapLists />
      <BootstrapForms />
      <BootstrapNavigation />


    </Container>
  );
}
