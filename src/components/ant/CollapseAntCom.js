import { Collapse } from "antd";
const { Panel } = Collapse;

const CollapseAntCom = ({
  openKeys = ["1"],
  onChange = () => {},
  isOpen = false,
  parentItems = [],
  childItems = [],
}) => {
  const ids = parentItems.map((item) => String(item.id));
  return (
    <Collapse
      // defaultActiveKey={["1"]}
      // activeKey={isOpen ? ["1", "2", "3"] : openKeys}
      defaultActiveKey={String(parentItems[0].id)}
      activeKey={isOpen ? ids : openKeys}
      // activeKey={openKeys}
      onChange={onChange}
      size="large"
    >
      {parentItems &&
        parentItems.length > 0 &&
        parentItems.map((parent, index) => {
          let lessionNo = 1;
          return (
            <Panel header={parent.name} key={parent.id}>
              {childItems &&
                childItems.length > 0 &&
                // eslint-disable-next-line array-callback-return
                childItems.map((child, i) => {
                  if (child.section_id === parent.id) {
                    return (
                      <div
                        key={child.id}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {lessionNo++}. {child.name}
                        </span>
                        <span>{child.duration}</span>
                      </div>
                    );
                  }
                })}
            </Panel>
          );
        })}
      {/* <Panel header="Introduce" key="1">
        <div className="flex justify-between items-center">
          <span>1.{text}</span>
          <span>03:58</span>
        </div>
      </Panel>
      <Panel header="How to install PHP" key="2">
        <p>{text}</p>
      </Panel>
      <Panel header="Learning PHP core" key="3">
        <p>{text}</p>
      </Panel> */}
    </Collapse>
  );
};
export default CollapseAntCom;
