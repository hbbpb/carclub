/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
var uuid = require('node-uuid');
var id = uuid.v4();
console.log(id);
var id2 = id.replace(/-/g, '');
console.log(id2);
