import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import sinon from 'sinon';

module("Integration | Component | <PureTaskList>", function (hooks) {
  setupRenderingTest(hooks);
  const taskData = {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
    updatedAt: new Date(2018, 0, 1, 9, 0),
  };
  const tasklist = [
    { ...taskData, id: "1", title: "Task 1" },
    { ...taskData, id: "2", title: "Task 2" },
    { ...taskData, id: "3", title: "Task 3" },
    { ...taskData, id: "4", title: "Task 4" },
    { ...taskData, id: "5", title: "Task 5" },
    { ...taskData, id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
  ];
  /* hooks.beforeEach(function() {
    this.setProperties({
      tasks: tasklist
    });
  }); */
  test("renders pinned tasks at the start of the list", async function (assert) {
    this.tasks = tasklist;
    // this.pinTask = sinon.stub();
    // this.archiveTask = sinon.stub();
    // // this.set("testpinTask", (actual) => {
    // //   console.log(`pinTask actual:${actual}`);
    // //   let expected = 1;
    // //   assert.deepEquals(actual, expected);
    // // });

    // this.set("testarchiveTask", (actual) => {
    //   console.log(`archiveTask actual:${actual}`);
    //   let expected = 1;
    //   assert.deepEquals(actual, expected);
    // });

    await render(
      hbs`<PureTaskList @tasks={{this.tasks}}/>`
    );
    // /* const firstItem= this.element.querySelectorAll('.list-item').length */
    // /* const firstItem= this.element.querySelector('.list-item:nth-of-type(1)').classList */
    assert
      .dom('[data-test-task]:nth-of-type(1)')
      .hasClass("TASK_PINNED");

    /* console.log(`firstItem:${JSON.stringify(firstItem,null,2)}`) */
    /* console.log(`firstItem:${firstItem}`) */
    /* assert.ok(1 == 1, "one equals one"); */
  });

  test("can pin tasks", async function (assert) {
    this.tasks = tasklist;
    this.pinTask = sinon.spy();

    await render(
      hbs`<PureTaskList
        @tasks={{this.tasks}}
        @pinTask={{this.pinTask}}
      />`
    );

    await click('[data-test-task]:nth-of-type(3) [data-test-task-pin]');

    assert.ok(this.pinTask.calledOnce);
  });
});
