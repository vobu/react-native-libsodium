import React from 'react';
import { crypto_sign_verify_detached, to_base64 } from 'react-native-libsodium';
import { FunctionStatus } from '../FunctionStatus';

export const Test_crypto_sign_verify_detached: React.FC = () => {
  const message = 'Hello World';
  const keyPair = {
    keyType: 'ed25519',
    privateKey: new Uint8Array([
      75, 127, 199, 101, 131, 29, 66, 210, 17, 236, 170, 64, 109, 224, 45, 127,
      172, 71, 87, 75, 101, 215, 119, 116, 5, 253, 248, 81, 177, 54, 59, 228,
      129, 33, 141, 186, 47, 179, 213, 15, 14, 148, 158, 145, 120, 152, 16, 22,
      235, 222, 236, 209, 157, 235, 235, 137, 190, 203, 245, 111, 49, 126, 250,
      158,
    ]),
    publicKey: new Uint8Array([
      129, 33, 141, 186, 47, 179, 213, 15, 14, 148, 158, 145, 120, 152, 16, 22,
      235, 222, 236, 209, 157, 235, 235, 137, 190, 203, 245, 111, 49, 126, 250,
      158,
    ]),
  };

  const message2 = new Uint8Array([
    72, 90, 158, 219, 156, 134, 114, 6, 249, 234, 125, 71, 159, 107, 113, 242,
    178, 31, 178, 48, 132, 136, 226, 123, 218, 227, 79, 228, 199, 161, 3, 71,
  ]);

  let throwErrorForInvalidPublicKey = false;
  try {
    crypto_sign_verify_detached(
      new Uint8Array([
        154, 39, 102, 2, 196, 230, 161, 247, 167, 233, 155, 107, 60, 147, 34,
        127, 184, 171, 14, 160, 82, 141, 238, 184, 214, 212, 171, 91, 142, 14,
        156, 25, 89, 190, 173, 162, 109, 217, 249, 251, 2, 48, 82, 74, 113, 85,
        136, 138, 200, 168, 70, 229, 251, 204, 208, 244, 105, 184, 217, 146,
        173, 186, 63, 7,
      ]),
      message,
      // @ts-expect-error
      'invalid_public_key'
    );
  } catch (e) {
    throwErrorForInvalidPublicKey = true;
  }

  return (
    <FunctionStatus
      name="crypto_sign_verify_detached"
      success={
        throwErrorForInvalidPublicKey &&
        crypto_sign_verify_detached(
          new Uint8Array([
            154, 39, 102, 2, 196, 230, 161, 247, 167, 233, 155, 107, 60, 147,
            34, 127, 184, 171, 14, 160, 82, 141, 238, 184, 214, 212, 171, 91,
            142, 14, 156, 25, 89, 190, 173, 162, 109, 217, 249, 251, 2, 48, 82,
            74, 113, 85, 136, 138, 200, 168, 70, 229, 251, 204, 208, 244, 105,
            184, 217, 146, 173, 186, 63, 7,
          ]),
          message,
          keyPair.publicKey
        ) &&
        crypto_sign_verify_detached(
          new Uint8Array([
            248, 93, 204, 1, 187, 58, 198, 221, 125, 38, 46, 120, 133, 83, 199,
            44, 4, 8, 236, 242, 234, 108, 134, 20, 196, 239, 185, 4, 109, 149,
            207, 153, 132, 57, 243, 107, 114, 51, 184, 70, 88, 11, 64, 131, 166,
            89, 172, 161, 244, 20, 106, 47, 106, 50, 53, 128, 92, 137, 111, 67,
            52, 251, 141, 1,
          ]),
          message2,
          keyPair.publicKey
        ) &&
        crypto_sign_verify_detached(
          new Uint8Array([
            9, 109, 105, 253, 79, 215, 61, 252, 188, 25, 4, 18, 154, 196, 163,
            251, 148, 103, 42, 103, 188, 142, 254, 92, 15, 110, 168, 3, 207,
            237, 30, 93, 17, 108, 161, 124, 113, 248, 238, 65, 230, 46, 218, 41,
            226, 89, 199, 128, 246, 85, 22, 247, 157, 28, 195, 213, 87, 74, 68,
            77, 36, 114, 213, 15,
          ]),
          to_base64(message2),
          keyPair.publicKey
        )
      }
    />
  );
};
