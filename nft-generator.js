const fs = require("fs");
var BigNumber = require('bignumber.js');
const config = require('./config');
const attributes = require('./attributes');

function getRandomInt(max) {
  return BigNumber.random(20).multipliedBy(max).integerValue();
}

function codeToArray(code) {
  let arr = [];

  for (let i=attributes.length-1; i>=0; i--) {

    // property gets the actual value of property i...
    let property = parseInt(code.mod(attributes[i].count).toFixed());

    // If this is a required property, the actual value ranges from 1 to attributes[i].count, so that required properties are never 0
    if (attributes[i].required) {
      arr[i] = property+1;
    }
    // If this is an optional property, the actual value ranges from 0 to attributes[i].count. 0 means this trait is not present
    else {
      arr[i] = property;
    }
    code = code.minus(arr[i]).dividedBy(attributes[i].count).integerValue();
  }

  return arr;
}

function bnIncludes(arr, bn) {
  for (let i=0; i<arr.length; i++) {
    if (arr[i].eq(bn)) return true;
  }
  return false;
}

function generateNFTs() {
  // Get a bigint of possible combinations
  let combinations = new BigNumber(1);
  for (let i=0; i<attributes.length; i++) {
    combinations = combinations.multipliedBy(attributes[i].required ? attributes[i].count : (attributes[i].count + 1));
  }
  console.log(`Possible combinations: ${combinations.toString()}`);

  // generate desired count of different random numbers in the range
  let faceCodes = [];
  while (faces.length < config.desiredCount) {
    let code = getRandomInt(combinations);
    if (!bnIncludes(faceCodes, code)) {
      faceCodes.push(code);
    }
  }
  
  console.log('faceCodes', faceCodes.length)

  // Convert generated codes into NFT properties
  let faces = [];
  for (let i=0; i<faceCodes.length; i++) {
    const face = codeToArray(faceCodes[i]);

    const mouthIndex = attributes.findIndex(a => a.name === 'Mouth');
    const smokeIndex = attributes.findIndex(a => a.name === 'Cigarette');
    const topIndex = attributes.findIndex(a => a.name === 'Head');
    const eyeIndex = attributes.findIndex(a => a.name === 'Eyes');
    const patternIndex = attributes.findIndex(a => a.name === 'Skin pattern');
    const mouth = attributes[mouthIndex].attrNames[face[mouthIndex] - 1];
    const smoke = attributes[smokeIndex].attrNames[face[smokeIndex] - 1];
    const eye = attributes[eyeIndex].attrNames[face[eyeIndex] - 1];
    const pattern = attributes[patternIndex].attrNames[face[patternIndex] - 1];
    const top = attributes[topIndex].attrNames[face[topIndex] - 1];

    if (mouth === 'BDSM GAG' && smoke !== 'Do not smoke') {
      continue;
    }

    if (eye === 'Default eye') {
      face[eyeIndex] = attributes[eyeIndex].attrNames.findIndex(name => name === eye) + 1;
    }

    if (smoke === 'Do not smoke') {
      face[smokeIndex] = attributes[smokeIndex].attrNames.findIndex(name => name === smoke) + 1;
    }

    if (pattern === 'Without pattern') {
      face[patternIndex] = attributes[patternIndex].attrNames.findIndex(name => name === pattern) + 1;
    }

    if (top === 'Empty head') {
      face[topIndex] = attributes[topIndex].attrNames.findIndex(name => name === top) + 1;
    }

    if (mouth === 'Default mouth') {
      face[mouthIndex] = attributes[mouthIndex].attrNames.findIndex(name => name === mouth) + 1;
    }

    faces.push(face);
  }

  // console.log('faces', faces.length);

  // Save faces
  if (!fs.existsSync(config.outputFolder)){
    fs.mkdirSync(config.outputFolder);
  }
  fs.writeFileSync(`${config.outputFolder}/${config.outputJSON}`, JSON.stringify(faces));
}

/**
 * Generate protobuf JSON schema
 */
function generateSchema() {
  // Empty schema
  let schema = {
    nested: {
      onChainMetaData: {
        nested: {
          NFTMeta: {
            fields: {
              traits: {
                id: 1,
                rule: 'repeated',
                type: 'FireballTrait'
              }
            }
          },
          FireballTrait: {
            options: {
            },
            values: {
            }
          }
        }
      }
    }
  };

  // Fill schema with attributes (traits)
  let value = 0;
  for (let i=0; i<attributes.length; i++) {
    for (let j=0; j<attributes[i].count; j++) {
      schema.nested.onChainMetaData.nested.FireballTrait.options[`PROP_${value}`] = `{"en": "${attributes[i].attrNames[j]}"}`;
      schema.nested.onChainMetaData.nested.FireballTrait.values[`PROP_${value}`] = value;
      value++;
    }
  }

  fs.writeFileSync(`${config.outputFolder}/${config.outputSchema}`, JSON.stringify(schema));
}

function main() {
  generateNFTs();
  generateSchema();
}

main();
