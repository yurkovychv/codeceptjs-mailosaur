const Helper = codecept_helper;
const MailosaurClient = require('mailosaur');
const assert = require('assert');
const faker = require('faker');

class Mailosaur extends Helper {
  constructor(config) {
    super(config);

    if (!config.serverId) {
      throw new Error('Mailosaur is not configured! Please provide serverId');
    }

    if (!config.apiKey) {
      throw new Error('Mailosaur is not configured! Please provide API key');
    }

    this.mailosaur = new MailosaurClient(config.apiKey);
    this.timeout = config.timeout || 10000;
    this.serverId = config.serverId;
  }

  /*
   getLastMessage method automatically waits for "timeout" and
   returns message sent to an "email". "timeout" is optional
  */
  async getLastMessage(email, timeout) {
    return await this.mailosaur.messages.get(this.serverId, {
      sentTo: email,
    }, {
      timeout: timeout || this.timeout,
    });
  }

  /*
   seeLinkInMessage method verifies that message contains links,
   or contains a particular link if it was provided
  */
  seeLinkInMessage(message, link) {

    if (link) {
      const result = message.text.links.find(({ href }) => href === link)?.href;

      assert.ok(
          result,
          `Expected message:\n ${JSON.stringify(message.html.links, null, 2)}\n to contain link: ${link}.`
      );
    } else {
      assert.ok(
          message.html.links.length,
          `Expected message:\n ${JSON.stringify(message, null, 2)}\n to contain links.`
      );
    }
  }

  // grabLinksFromMessage method returns links array from message
  async grabLinksFromMessage(message) {
    return message.text.links;
  }

  // getLinksFromMessageByMessageId method returns links array from message by Message ID
  async getLinksFromMessageByMessageId(id) {
    const message = await this.getMessageById(id);

    return await this.grabLinksFromMessage(message);
  }

  // getMessageById returns message by Message ID
  async getMessageById(id) {
    return this.mailosaur.messages.getById(id);
  }

  // deleteMessage deletes message by Message ID
  async deleteMessage(id) {
    return this.mailosaur.messages.del(id);
  }

  // listMessages returns list of a messages in a Server
  // serverId is optional. Uses Server ID from config by default
  async listMessages(serverId) {
    return this.mailosaur.messages.list(serverId || this.serverId, {});
  }

  // generateNewEmail generates and returns email in format "<firstName>.<lastName>@<serverId>.mailosaur.net"
  generateNewEmail() {
    return `${faker.name.firstName()}.${faker.name.lastName()}@${this.serverId}.mailosaur.net`;
  }

  // seeTextInMessage verifies that message Body contains text
  seeTextInMessage(text, message) {
    assert.ok(message.text.body.includes(text));
  }

  // seeTextInSubject verifies that message Subject contains text
  seeTextInSubject(text, message) {
    assert.ok(message.subject.includes(text));
  }
}

module.exports = Mailosaur;
